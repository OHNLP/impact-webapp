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
  private _activeView: View = View.USER_LOGIN

  // private _activeView: View = View.PLUMMER
  private _activePatientView: PatientView = PatientView.SUMMARY;
  private _activePatientViewTabIndex: number = 1;
  private _activePatient: PatInfo | undefined;
  private _activeProject: Project | undefined = EXAMPLE_PROJECTS[0];
  private _activePatientIdx: number = 0;
  private _activeCohortSize: number = 0;
  private _selectedPatientCriteriaFilter: string | undefined;

  // uw means the user is watching XXX
  public CohortInclusion = CohortInclusion;

  // for plummer
  public uwProject: Project | undefined = EXAMPLE_PROJECTS[0];
  public uwJobSelected: JobInfo | undefined = EXAMPLE_JOBS[0];
  public uwJobs: JobInfo[] | undefined;
  public uwCohort: PatInfo[] | undefined;
  public uwPat: PatInfo| undefined = EXAMPLE_PATIENTS[0];
  public uwCriteria: CohortDefinition| undefined = EXAMPLE_CRITERIA_GERD;
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

  get activeView(): View {
    return this._activeView
  }

  set activeView(view: View) {
    this._activeView = view
  }

  get activePatientView(): PatientView {
    return this._activePatientView
  }

  set activePatientView(view: PatientView) {
    this._activePatientView = view
  }

  get activePatientViewTabIndex(): number {
    return this._activePatientViewTabIndex;
  }

  set activePatientViewTabIndex(value: number) {
    this._activePatientViewTabIndex = value;
  }

  get activePatient(): PatInfo | undefined {
    return this._activePatient;
  }

  set activePatient(value: PatInfo | undefined) {
    this._activePatient = value;
  }

  get activeProject(): Project | undefined {
    return this._activeProject;
  }

  set activeProject(project: Project | undefined) {
    // const refresh = this._activeProject !== project;
    const refresh = true;
    if (refresh) {
      this._activeProject = project;
      this.activeView = View.PROJECT_DASHBOARD
      this.selectedPatientCriteriaFilter = undefined

      if (project) {
        // first, load cohort
        this.middleware.rest.get_patients(project.uid).subscribe(rs => {
          this._activeCohortSize = rs.length;
        });

        // then, load jobs
        this.middleware.rest.get_jobs(project.uid).subscribe(rs => {
          // load jobs
          this.uwJobs = rs;

          // specify working job
          this.uwJobSelected = rs[0];

          // set the uw job to the last completed
          this.uwJobSelected = this.uwJobs[0];
        });
      }

    }
  }

  get activePatientIdx(): number {
    return this._activePatientIdx;
  }

  set activePatientIdx(value: number) {
    this._activePatientIdx = value;
    this.selectedPatientCriteriaFilter = undefined
  }

  get activeCohortSize(): number {
    return this._activeCohortSize;
  }

  get selectedPatientCriteriaFilter(): string | undefined {
    return this._selectedPatientCriteriaFilter;
  }

  set selectedPatientCriteriaFilter(value: string | undefined) {
    this._selectedPatientCriteriaFilter = value;
  }

  public resetView(): void {
    this.activeView = View.GLOBAL_DASHBOARD
    this.activePatientView = PatientView.SUMMARY
  }

  public resetPatientView(): void {
    this.activePatientView = PatientView.SUMMARY
  }

  /////////////////////////////////////////////////////////
  // Cohort related functions
  /////////////////////////////////////////////////////////
  public showCohort(): void {
    
  }

  /////////////////////////////////////////////////////////
  // Plummer related functions
  /////////////////////////////////////////////////////////
  public showCriteria(): void {
    this.middleware.rest.getCohortCriteria(
      this.activeProject!.uid
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
      this.uwCriteriaAssessing.node_id
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
