import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {PatientView, View} from "../views/views";
import {CohortInclusion, PatInfo} from "../models/pat-info";
import {Project} from "../models/project";
import {MiddlewareAdapterService} from "./middleware-adapter.service";
import { formatDate } from '@angular/common';
import { CohortDefinition } from '../models/cohort-definition';

import { Determination, JUDGEMENT_AGREEMENT, JUDGEMENT_TYPE } from '../models/determination';
import { Fact } from '../models/clinical-data';
import { EXAMPLE_PROJECTS } from '../samples/sample-project';
import { EXAMPLE_PATIENTS } from '../samples/sample-patient';
import { EXAMPLE_CRITERIA_GERD } from '../samples/sample-criteria';
import { JobInfo } from '../models/job-info';
import { EXAMPLE_JOBS } from '../samples/sample-job';
import { ToastrService } from 'ngx-toastr';
import { concat, concatMap, of } from 'rxjs';
import * as dayjs from 'dayjs';
import { DataSource } from '../models/data-source';

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
  
  // for user generated infor
  public uwPlummerLoading: boolean = false;
  public uwDeterminationDict: Record<string, Determination> = {};
  public uwAdjudicationMode: boolean = false;
  public uwAdjudicationDict: Record<string, any> = {};

  // for data sources
  public uwAllDataSources: DataSource[] | undefined;
  public uwPrjDataSources: DataSource[] | undefined;
  public uwJobDataSources: DataSource[] | undefined;

  // for UMLS Code search
  public uwIsSearchingUMLSCodes: boolean = false;
  public uwUMLSCodes: string[] | undefined;

  // for Phenotype search
  public uwIsSearchingPhenoReps: boolean = false;
  public uwPhenoReps: CohortDefinition[] | undefined;
  
  // for facts
  public uwFacts: Fact[] | undefined;

  // shortcuts
  public CohortInclusion = CohortInclusion;

  constructor(
    private middleware: MiddlewareAdapterService,
    @Inject( LOCALE_ID )public locale_id: string,
    public toastr: ToastrService
  ) {
  }

  public setView(view: View): void {
    this.activeView = view;
  }

  public getUsername(): string {
    return '' + localStorage.getItem('username');
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

  public getNumberDeterminedCriteria(pat: PatInfo): number {
    return pat.stat!.n_criteria_yes + 
      pat.stat!.n_criteria_no + 
      pat.stat!.n_criteria_na;
  }

  public getNumberAllCriteria(): number {
    let n_inc = this.getNumberInclusionCriteria();
    let n_exc = this.getNumberExclusionCriteria();
    
    return n_inc + n_exc;
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

      // get current user UID
      let user_uid = '' + localStorage.getItem('username');

      // TODO update this UID if it is in return obj
      dd[n.nodeUID] = {
        job_uid: this.uwJobSelected!.job_uid,
        patient_uid: this.uwPat!.pat_uid,
        criteria_uid: n.nodeUID,
        // get the uid from local
        user_uid: user_uid,
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

  public showAdjudications(): void {
    this.middleware.rest.get_adjudications(
      this.uwJobSelected!.job_uid, // job_uid
      this.uwPat!.pat_uid,
      this.uwCriteria!,
      this.uwDeterminationDict
    ).subscribe(ds => {
      this._showAdjudications(ds);
      // update the loading status
      this.uwPlummerLoading = false;
    });
  }

  public _showAdjudications(ds: any): void {
    // to dictionary
    type dtmnRecord = Record<string, any>;
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
      // TODO update this UID if it is in return obj
      dd[n.nodeUID] = ds[n.nodeUID];
    }

    console.log('* loaded latest adjudication', dd);
    this.uwAdjudicationDict = dd;
  }

  public calcAgreement(criteria_uid: string): JUDGEMENT_AGREEMENT {
    let my_dtmn = this.uwDeterminationDict[criteria_uid].judgement;
    let n = 0;
    for (const user_uid in this.uwAdjudicationDict[criteria_uid]) {
      let ot_dtmn = this.uwAdjudicationDict[criteria_uid][user_uid].judgement;
      if (!this.isEqualDtmn(my_dtmn, ot_dtmn)) {
        return JUDGEMENT_AGREEMENT.DISAGREED;
      }
      n += 1;
    }
    if (n == 0) {
      return JUDGEMENT_AGREEMENT.INSUFFICIENT;
    }
    
    return JUDGEMENT_AGREEMENT.AGREED;
  }

  public isEqualDtmn(dtmn_a: JUDGEMENT_TYPE, dtmn_b: JUDGEMENT_TYPE): boolean {
    if (dtmn_a == dtmn_b) {
      return true;
    }

    if ([JUDGEMENT_TYPE.JUDGED_MATCH, 
         JUDGEMENT_TYPE.EVIDENCE_FOUND,
         JUDGEMENT_TYPE.EVIDENCE_FOUND_NLP].indexOf(dtmn_a) >= 0 &&
         [JUDGEMENT_TYPE.JUDGED_MATCH, 
          JUDGEMENT_TYPE.EVIDENCE_FOUND,
          JUDGEMENT_TYPE.EVIDENCE_FOUND_NLP].indexOf(dtmn_b) >= 0) {
      return true;
    }

    return false;
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

  public loadAllDataSources(): void {
    this.middleware.rest.get_all_data_sources().subscribe(ds => {
      console.log('* loaded all data sources', ds);
      this.uwAllDataSources = ds;
      this.toastr.success('Loaded all avaiable data sources');
    });
  }

  public loadPrjDataSources(): void {
    this.middleware.rest.get_project_data_sources(
      this.uwProject!.uid
    ).subscribe(ds => {
      console.log('* loaded project data sources', ds);
      this.uwPrjDataSources = ds;
      this.toastr.success('Loaded project data sources');
    });
  }

  public savePrjDataSources(): void {
    this.middleware.rest.update_project_data_sources(
      this.uwProject!.uid,
      this.uwPrjDataSources!
    ).subscribe(ds => {
      console.log('* saved project data sources', ds);
      this.toastr.success('Updated project data sources');
    });
  }

  public loadJobDataSources(): void {
    this.middleware.rest.get_job_data_sources(
      this.uwJobSelected!.job_uid
    ).subscribe(ds => {
      console.log('* loaded job data sources', ds);
      this.uwJobDataSources = ds;
      this.toastr.success('Loaded job data sources');
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

  public searchUMLSCodes(keyword: string, callback: Function): void {
    this.uwIsSearchingUMLSCodes = true;
    this.middleware.rest.get_umls_codes_by_keyword(keyword).subscribe(rs => {
      this.uwUMLSCodes = rs;
      this.uwIsSearchingUMLSCodes = false;
      // do something.
      callback()
      this.toastr.success(
        "Found " + rs.length + ' UMLS CUIs'
      );
    });
  }

  public searchPhenotypeReps(keyword: string, callback: Function): void {
    this.uwIsSearchingPhenoReps = true;
    this.middleware.rest.get_pheno_reps_by_keyword(keyword).subscribe(rs => {
      this.uwPhenoReps = rs;
      this.uwIsSearchingPhenoReps = false;
      // do something.
      callback()
      this.toastr.success(
        "Found " + rs.length + ' Phenotype Representations'
      );
    });
  }

  
}
