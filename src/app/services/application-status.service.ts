import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {PatientView, View} from "../views/views";
import {CohortInclusion, PatInfo} from "../models/pat-info";
import {Project} from "../models/project";
import {MiddlewareAdapterService} from "./middleware-adapter.service";
import { formatDate } from '@angular/common';
import { CohortDefinition } from '../models/cohort-definition';

import { Determination, JUDGEMENT_TYPE } from '../models/determination';
import { Fact } from '../models/clinical-data';
import { EXAMPLE_PROJECTS } from '../samples/sample-project';
import { EXAMPLE_PATIENTS } from '../samples/sample-patient';
import { EXAMPLE_CRITERIA_GERD } from '../samples/sample-criteria';
import { JobInfo } from '../models/job-info';
import { EXAMPLE_JOBS } from '../samples/sample-job';
import { ToastrService } from 'ngx-toastr';
import { concat, concatMap, of } from 'rxjs';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {
  public activeView: View = View.USER_LOGIN
  
  // for plummer
  // uw means the user is watching XXX
  public uwProjects: Project[] | undefined;
  public uwProject: Project | undefined;
  public uwJobSelected: JobInfo | undefined;
  public uwJobs: JobInfo[] | undefined;
  public uwCohort: PatInfo[] | undefined;
  public uwProjectLoading: boolean = false;
  public uwPat: PatInfo| undefined;
  public uwCriteria: CohortDefinition| undefined;
  public uwCriteriaAssessing: CohortDefinition| undefined;
  public uwCriteriaUseEditorMode: boolean = false;
  public uwFact: Fact | undefined;
  public uwDocShowRawJSON: boolean = false;
  
  // for facts
  public uwFacts: Fact[] | undefined;

  // for user generated infor
  public uwDeterminationDict: Record<string, Determination> = {};
  public uwPlummerLoading: boolean = false

  // shortcuts
  public CohortInclusion = CohortInclusion;

  constructor(
    private middleware: MiddlewareAdapterService,
    @Inject( LOCALE_ID )public locale_id: string,
    private toastr: ToastrService
  ) {
  }

  public setView(view: View): void {
    this.activeView = view;
  }

  /////////////////////////////////////////////////////////
  // Project related functions
  /////////////////////////////////////////////////////////
  public setProject(prj: Project): void {
    if (this.uwProject?.uid == prj.uid) {
      // nothing to do
    } else {
      this.uwProject = prj;
      this.activeView = View.PROJECT_DASHBOARD;
    }
  }

  public showProjects(): void {
    this.middleware.rest.get_projects().subscribe(rs => {
      console.log("* loaded " + rs.length + ' projects');
      this.uwProjects = rs;
    });
  }

  public createProject(): void {
    var ret = window.prompt('Project Name');
    var _this = this;
    if (ret) {
      this.middleware.rest.create_project(ret).subscribe({
        next: function(p) {
          // update the list
          _this.showProjects();
        },
        error: function(err) {
          alert(err);
        }
      });
    }
  }

  public loadDataByProject(): void {
    if (!this.uwProject) {
      return;
    }
    this.uwProjectLoading = true;

    of(this.uwProject.uid).pipe(
      // first, get all jobs
      concatMap(project_uid => {
        return this.middleware.rest.get_jobs(project_uid)
      }),
      // second, get the criteria for this project
      concatMap(jobs => {
        console.log('* loaded jobs', jobs);
        this._showJobs(jobs);
        return this.middleware.rest.get_criteria(this.uwProject!.uid)
      }),
      // third, get all the patients based on the last job
      concatMap(criteria => {
        console.log('* loaded criteria', criteria);
        this.uwCriteria = criteria;
        return this.middleware.rest.get_patients(this.uwJobSelected!.job_uid)
      })
    ).subscribe(patients=>{
      this.uwCohort = patients;
      this.uwProjectLoading = false;
    });

  }

  /////////////////////////////////////////////////////////
  // Job related functions
  /////////////////////////////////////////////////////////
  public submitNewJob(): void {
    this.middleware.rest.submit_job(
      this.uwProject!.uid
    ).subscribe(rsp=>{
      console.log('* created job', rsp);
      this.toastr.success(
        "A new job [" + rsp.job_uid + '] is submitted!'
      );
    })
  }

  public cancelJob(job: JobInfo): void {
    this.middleware.rest.cancel_job(
      job.job_uid
    ).subscribe(rsp=>{
      if (rsp) {
        window.alert('Job [' + this.getJobShortUID(job) + '] is canceled.');
      } else {
        window.alert('Canceling... refresh list later.');
      }

    })
  }

  public showJobs(): void {
    this.middleware.rest.get_jobs(this.uwProject!.uid).subscribe(rs => {
      this._showJobs(rs);
    });
  }

  public _showJobs(jobs: JobInfo[]): void {
    // load jobs
    this.uwJobs = jobs;

    // set the uw job to the last completed
    if (jobs.length > 0) {
      this.uwJobSelected = this.uwJobs[0];
    } else {
      this.uwJobSelected = undefined;
    }
  }

  /////////////////////////////////////////////////////////
  // Cohort related functions
  /////////////////////////////////////////////////////////
  public showCohort(): void {
    if (this.uwProject) {
      if (this.uwJobSelected === undefined) {
        return;
      }

      this.uwProjectLoading = true;

      // ok, now try to load patients
      this.middleware.rest.get_patients(
        this.uwJobSelected!.job_uid
      ).subscribe(ps => {
        // set the local cohort first
        this.uwProjectLoading = false;
        this.uwCohort = ps;
      })

    }
  }

  public statCohortDecision(): any {
    let stat = {
      n_included: 0,
      n_excluded: 0,
      n_unjudged: 0
    }

    if (this.uwCohort == undefined) {
      return stat;
    }

    for (let i = 0; i < this.uwCohort.length; i++) {
      const patient = this.uwCohort[i];
      
      if (patient.inclusion == CohortInclusion.INCLUDE) {
        stat.n_included += 1;
      } else if (patient.inclusion == CohortInclusion.EXCLUDE) {
        stat.n_excluded += 1;
      } else {
        stat.n_unjudged += 1;
      }
    }

    return stat;
  }

  public showDecisions(): void {
    let pat_uids = this.uwCohort!.map(p=>p.pat_uid);
    this.middleware.rest.get_patient_decisions(
      this.uwJobSelected!.job_uid,
      pat_uids
    ).subscribe(decisions => {
      let dd = decisions as Map<string, CohortInclusion>;
      // update the information of decisions
      for (let i = 0; i < this.uwCohort!.length; i++) {
        const pat_uid = this.uwCohort![i].pat_uid;
        this.uwCohort![i].inclusion = 
          dd.get(pat_uid) || CohortInclusion.UNJUDGED;
      }
    })
  }

  /////////////////////////////////////////////////////////
  // Plummer related functions
  /////////////////////////////////////////////////////////
  public resetPlummer(): void {
    this.uwFacts = [];
    this.uwFact = undefined;
  }

  public showCriteria(): void {
    this.middleware.rest.get_criteria(
      this.uwProject!.uid
    ).subscribe(criteria => {
      console.log('* loaded latest criteria', criteria);
      this.uwCriteria = criteria;
    });
  }

  public saveCriteria(): void {
    this.middleware.rest.update_criteria(
      this.uwProject!.uid,
      this.uwCriteria!
    ).subscribe(rsp => {
      this.toastr.success("Saved the criteria updates.");
      console.log('* saved current criteria', rsp);
    })
  }

  public getNumberInclusionCriteria(): number {
    if (this.uwCriteria) {
      if (this.uwCriteria.children) {
        if (this.uwCriteria.children[0].children) {
          return this.uwCriteria.children[0].children!.length;
        }
      }
    }
    return 0
  }

  public getNumberExclusionCriteria(): number {
    if (this.uwCriteria) {
      if (this.uwCriteria.children) {
        if (this.uwCriteria.children[1].children) {
          return this.uwCriteria.children[1].children!.length;
        }
      }
    }
    return 0
  }

  public setDecision(judgement: CohortInclusion): void {
    this.middleware.rest.update_patient_decision(
      this.uwJobSelected!.job_uid,
      this.uwPat!.pat_uid,
      judgement
    ).subscribe(rsp => {
      console.log('* set decision to ',judgement,' returns:', rsp);
      this.toastr.success(
        "The decision is saved."
      );
    })
  }

  public setDetermination(
    criteria: CohortDefinition,
    dtmn: Determination
  ): void {
    this.middleware.rest.update_determination(
      this.uwJobSelected!.job_uid,
      criteria.nodeUID,
      this.uwPat!.pat_uid,
      dtmn
    ).subscribe(rsp => {
      console.log('* set dtmn returns:', rsp);
      this.toastr.success(
        "The determination is saved with comment."
      );
    })
  }

  public showDeterminations(): void {
    this.middleware.rest.get_determinations(
      this.uwJobSelected!.job_uid, // job_uid
      this.uwPat!.pat_uid,
      this.uwCriteria!
    ).subscribe(ds => {
      this._showDeterminations(ds);
    });
  }

  public _showDeterminations(ds: Array<Determination>): void {
    // to dictionary
    type dtmnRecord = Record<string, Determination>;
    let dd: dtmnRecord = {};

    function get_nodes(node:any) {
      var ns: any[] = [];
      if (node.hasOwnProperty('children')) {
        for (let i = 0; i < node.children.length; i++) {
          const c = node.children[i];
          ns.push(c);
          var _ns = get_nodes(c);
          Array.prototype.push.apply(ns, _ns);
        }
      }

      return ns;
    }
    let nodes = get_nodes(this.uwCriteria);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      dd[n.nodeUID] = {
        job_uid: this.uwJobSelected!.job_uid,
        patient_uid: this.uwPat!.pat_uid,
        criteria_uid: n.nodeUID,
        judgement: JUDGEMENT_TYPE.UNJUDGED,
        comment: '',
        date_updated: new Date(),
      };
    }

    // overwrite 
    for (let i = 0; i < ds.length; i++) {
      // use criteria's id as key
      dd[ds[i].criteria_uid] = ds[i];
    }

    console.log('* loaded latest determinations', dd);
    this.uwDeterminationDict = dd;
  }

  public showCriteriaByProject(project_uid: string): void {

  }

  public showFactDetail(fact: Fact): void {
    this.middleware.rest.get_fact_detail(
      fact.evidence_id
    ).subscribe(rsp => {
      let d = rsp as any;
      // update the fhir object
      this.uwFact!.fhir = d;
      console.log('* loaded fact detail', rsp);
    });
  }

  public showFactDetails(facts: Fact[]): void {
    this.middleware.rest.get_fact_details(
      facts.map(f=>f.evidence_id)
    ).subscribe(rsp => {
      let d = rsp as any;
      // update the fhir object
      for (let i = 0; i < this.uwFacts!.length; i++) {
        this.uwFacts![i].fhir = d[this.uwFacts![i].evidence_id];
        // update the date information
        this.updateFactDateByFHIR(this.uwFacts![i]);
      }
      console.log('* loaded fact details', rsp);
    });
  }

  public updateFactDateByFHIR(fact: Fact|undefined): void {
    if (fact === undefined) {
      return;
    }
    if (fact.fhir.hasOwnProperty('recordedDate')) {
      fact.date_time = dayjs(fact.fhir.recordedDate).toDate();

    } else if (fact.fhir.hasOwnProperty('issued')) {
      fact.date_time = dayjs(fact.fhir.issued).toDate();

    } else if (fact.fhir.hasOwnProperty('dateAsserted')) {
      fact.date_time = dayjs(fact.fhir.dateAsserted).toDate();

    } else if (fact.fhir.hasOwnProperty('date')) {
      fact.date_time = dayjs(fact.fhir.date).toDate();

    }
    return;
  }

  public clearFacts(): void {
    this.uwFacts = [];
  }

  public showFactsByCriterion(criteria?: CohortDefinition): void {
    // set the current uwCriteriaAssessing
    this.uwCriteriaAssessing = criteria;

    // update the facts
    if (this.uwCriteriaAssessing === undefined) {
      this.uwFacts = [];
      return;
    }
    this.middleware.rest.get_facts(
      this.uwJobSelected!.job_uid, // job uid
      this.uwCriteriaAssessing.nodeUID, // ode_uid (criteria uid)
      this.uwPat!.pat_uid, // person_uid
    ).subscribe(facts => {
      // ok // 
      console.log('* get_facts callback: ', facts);
      this.uwFacts = facts;

      // next send requests for FHIR
      this.showFactDetails(this.uwFacts);
    });
  }

  public loadPlummerDataByPatient(): void {
    if (!this.uwPat) { return; }

    this.uwPlummerLoading = true;

    of(this.uwPat.pat_uid).pipe(
      // first, get patient details
      concatMap(patient_uid => {
        return this.middleware.rest.get_patient_detail(patient_uid)
      }),

      // second, get the determinations
      concatMap(patient_fhir => {
        this.uwPat!.fhir = patient_fhir;

        return this.middleware.rest.get_determinations(
          this.uwJobSelected!.job_uid, // job_uid
          this.uwPat!.pat_uid,
          this.uwCriteria!
        );
      })
    ).subscribe(ds => {
      this._showDeterminations(ds);

      this.uwPlummerLoading = false;
    });
  }

  /////////////////////////////////////////////////////////
  // Helper related functions
  /////////////////////////////////////////////////////////

  public fmtDate(d:Date|undefined): string {
    if (d === undefined) {
      return '-';
    }
    return formatDate(d, 'MM/dd/yyyy', this.locale_id)
  }

  public getJobShortUID(job: JobInfo): string {
    return job.job_uid.split('-')[0];
  }

  public getToday():string {
    return this.fmtDate(new Date());
  }

  public gotoEHR(): void {
    alert('Open EHR System');
  }

  public userLogin(username: string, password: string): void {
    let t = username + ':' + password;
    var hash = window.btoa(t);
    var header = "Basic " + hash;

    localStorage.setItem(
      'username',
      username
    );
    localStorage.setItem(
      'header_user_credentials',
      header
    );

    // check
    var _this = this;
    this.middleware.rest.get_projects().subscribe({
      next(rsp) {
          // ok, login done, jump to project list
          console.log('* Login OK');
          // update view
          _this.activeView = View.PROJECT_LIST;
      },
      error(err) {
        alert(err);
      }
    });
  }

  public userLogout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('header_user_credentials');
    
    // clear everything?
    delete this.uwProject;
    delete this.uwJobSelected;
    delete this.uwJobs;
    delete this.uwCohort;
    delete this.uwPat;
    delete this.uwCriteria;
    delete this.uwCriteriaAssessing;
    delete this.uwFact;

    // go to login
    this.activeView = View.USER_LOGIN;
  }


  public saveDetermination(dtmn: Determination): void {

  }
}
