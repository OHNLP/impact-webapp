import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {PatientView, View} from "../views/views";
import {CohortInclusion, PatInfo} from "../models/pat-info";
import {Project} from "../models/project";
import {PatientViewComponent} from "../views/results/patient-view/patient-view.component";
import {MiddlewareAdapterService} from "./middleware-adapter.service";
import { formatDate } from '@angular/common';
import { CohortDefinition } from '../models/cohort-definition';

import { Determination } from '../models/Determination';
import { Fact } from '../models/clinical-data';
import { EXAMPLE_PROJECT } from '../samples/sample-project';
import { EXAMPLE_PATIENT } from '../samples/sample-patient';
import { EXAMPLE_CRITERIA_RRMM_XS } from '../samples/sample-criteria';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {
  private _activeView: View = View.PLUMMER
  // private _activeView: View = View.PLUMMER
  private _activePatientView: PatientView = PatientView.SUMMARY;
  private _activePatientViewTabIndex: number = 1;
  private _activePatient: PatInfo | undefined;
  private _activeProject: Project | undefined = EXAMPLE_PROJECT;
  private _activePatientIdx: number = 0;
  private _activeCohortSize: number = 0;
  private _selectedPatientCriteriaFilter: string | undefined;

  // uw means the user is watching XXX
  public CohortInclusion = CohortInclusion;

  // for plummer
  public uwProject: Project | undefined = EXAMPLE_PROJECT;
  public uwPat: PatInfo| undefined = EXAMPLE_PATIENT;
  public uwCriteria: CohortDefinition| undefined = EXAMPLE_CRITERIA_RRMM_XS;
  public uwCriteriaNodeID: string| undefined;
  
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

  set activeProject(value: Project | undefined) {
    const refresh = this._activeProject !== value
    if (refresh) {
      this._activeProject = value;
      this.activeView = View.PROJECT_DASHBOARD
      this.selectedPatientCriteriaFilter = undefined
      if (value) {
        this._activeCohortSize = this.middleware.rest.getRetrievedCohort(value.uid).length
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
  // Plummer related functions
  /////////////////////////////////////////////////////////

  public showCriteriaByProject(project_uid: string): void {

  }

  public showFactsByCriterion(criteria_uid?: string): void {
    // set the current uwCriteriaNodeID
    this.uwCriteriaNodeID = criteria_uid;

    // update the facts
    if (this.uwCriteriaNodeID === undefined) {
      this.uwFacts = [];
      return;
    }
    this.middleware.ajax.get_facts(
      '', // job uid
      '', // node_uid (criteria uid)
      this.uwCriteriaNodeID
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
}
