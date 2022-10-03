import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {PatientView, View} from "../views/views";
import {CohortInclusion, PatInfo} from "../models/pat-info";
import {Project} from "../models/project";
import {MiddlewareAdapterService} from "./middleware-adapter.service";
import { formatDate } from '@angular/common';
import { CohortDefinition } from '../models/cohort-definition';

import { Determination } from '../models/determination';
import { Fact } from '../models/clinical-data';
import { EXAMPLE_PROJECTS } from '../samples/sample-project';
import { EXAMPLE_PATIENTS } from '../samples/sample-patient';
import { EXAMPLE_CRITERIA_GERD } from '../samples/sample-criteria';
import { JobInfo } from '../models/job-info';
import { EXAMPLE_JOBS } from '../samples/sample-job';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {
  public activeView: View = View.USER_LOGIN

  // private activeView: View = View.PLUMMER
  private _activePatientView: PatientView = PatientView.SUMMARY;
  private _activePatientViewTabIndex: number = 1;
  private _activePatient: PatInfo | undefined;
  private _uwProject: Project | undefined;
  private _activePatientIdx: number = 0;
  private _activeCohortSize: number = 0;
  private _selectedPatientCriteriaFilter: string | undefined;

  // uw means the user is watching XXX
  public CohortInclusion = CohortInclusion;

  // for plummer
  public uwProject: Project | undefined;
  public uwJobSelected: JobInfo | undefined;
  public uwJobs: JobInfo[] | undefined;
  public uwCohort: PatInfo[] | undefined;
  public uwPat: PatInfo| undefined;
  public uwCriteria: CohortDefinition| undefined;
  public uwCriteriaAssessing: CohortDefinition| undefined;
  public uwCriteriaUseEditorMode: boolean = false;
  public uwFact: Fact | undefined;
  
  // for facts
  public uwFacts: Fact[] | undefined;

  // for user generated infor
  public uwDeterminationDict: Record<string, Determination> = {};

  constructor(
    private middleware: MiddlewareAdapterService,
    @Inject( LOCALE_ID )public locale_id: string
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
      // then, load jobs
      this.middleware.rest.get_jobs(this.uwProject.uid).subscribe(rs => {
        // load jobs
        this.uwJobs = rs;

        // set the uw job to the last completed
        if (rs.length > 0) {
          this.uwJobSelected = this.uwJobs[0];
        } else {
          this.uwJobSelected = undefined;
        }
      });
    }
  }

  /////////////////////////////////////////////////////////
  // Job related functions
  /////////////////////////////////////////////////////////
  public submitNewJob(): void {
    this.middleware.rest.submit_job(
      this.uwProject!.uid
    ).subscribe(rsp=>{
      console.log('* created job', rsp);
      window.alert('Created Job [' + rsp.uid + ']');
    })
  }

  /////////////////////////////////////////////////////////
  // Cohort related functions
  /////////////////////////////////////////////////////////
  public showCohort(): void {
    
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

  public setDecision(judgement: CohortInclusion): void {
    this.middleware.rest.update_patient_decision(
      this.uwJobSelected!.uid,
      this.uwPat!.pat_uid,
      judgement
    ).subscribe(rsp => {
      console.log('* set decision to ',judgement,' returns:', rsp);
    })
  }

  public setDetermination(
    criteria: CohortDefinition,
    dtmn: Determination
  ): void {
    this.middleware.rest.update_determination(
      this.uwJobSelected!.uid,
      criteria.nodeUID,
      this.uwPat!.pat_uid,
      dtmn
    ).subscribe(rsp => {
      console.log('* set dtmn to ',dtmn,' returns:', rsp);
    })
  }

  public showDeterminations(): void {
    this.middleware.rest.get_determinations(
      '', // uid
      this.uwPat!.pat_uid,
    ).subscribe(ds => {
      // to dictionary
      type dtmnRecord = Record<string, Determination>;
      let dd: dtmnRecord = {};

      for (let i = 0; i < ds.length; i++) {
        // use criteria's id as key
        dd[ds[i].criteria_uid] = ds[i];
      }

      console.log('* loaded latest determinations', dd);
      this.uwDeterminationDict = dd;
    });
  }

  public showCriteriaByProject(project_uid: string): void {

  }

  public showFactFullText(fact: Fact): void {
    this.middleware.rest.get_fact_detail(
      fact.evidence_id
    ).subscribe(rsp => {
      // update the fhir object
      this.uwFact!.fhir = rsp;
      console.log('* loaded fact full text', rsp);
    });
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
      '', // job uid
      '', // node_uid (criteria uid)
      this.uwCriteriaAssessing.nodeUID
    ).subscribe(facts => {
      // ok // 
      console.log('* get_facts callback: ', facts);
      this.uwFacts = facts;
    });
  }

  public fmtDate(d:Date|undefined): string {
    if (d === undefined) {
      return '-';
    }
    return formatDate(d, 'MM/dd/yyyy', this.locale_id)
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
    this.middleware.rest.get_projects().subscribe(projects=>{
      // ok, login done, jump to project list
      console.log('OK')
      // update view
      this.activeView = View.PROJECT_LIST;
    });
  }

  public userLogout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('header_user_credentials');
    // go to login
    this.activeView = View.USER_LOGIN;
  }


  public saveDetermination(dtmn: Determination): void {

  }
}
