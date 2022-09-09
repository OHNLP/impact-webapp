import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {PatientView, View} from "../views/views";
import {PatInfo} from "../models/pat-info";
import {Project} from "../models/project";
import {PatientViewComponent} from "../views/results/patient-view/patient-view.component";
import {MiddlewareAdapterService} from "./middleware-adapter.service";
import { Patient } from '../models/patient';
import { EXAMPLE_FACTS, EXAMPLE_PATIENT } from '../models/sample-data';
import { formatDate } from '@angular/common';
import { CohortDefinition } from '../models/cohort-definition';
import { example_cohort_definition } from '../views/project/cohort-definition/example-data';
import { Determination } from '../models/determination';
import { Fact, FactCollection } from '../models/clinical-data';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {
  // private _activeView: View = View.GLOBAL_DASHBOARD
  private _activeView: View = View.PLUMMER
  private _activePatientView: PatientView = PatientView.SUMMARY
  private _activePatientViewTabIndex: number = 1
  private _activePatient: PatInfo | undefined
  private _activeProject: Project | undefined
  private _activePatientIdx: number = 0;
  private _activeCohortSize: number = 0;
  private _selectedPatientCriteriaFilter: string | undefined

  // uw means the user is watching XXX
  // for plummer
  public uwPatient: Patient| undefined = EXAMPLE_PATIENT;
  public uwCriteria: CohortDefinition| undefined = example_cohort_definition;
  public uwCriteriaNodeID: string| undefined;
  
  // for facts
  public uwFactCollections: FactCollection[] | undefined;

  // for user generated infor
  public uwDeterminationDict: Record<string, Determination> = {};

  constructor(
    private _middleware: MiddlewareAdapterService,
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
        this._activeCohortSize = this._middleware.rest.getRetrievedCohort(value.uid).length
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

  public setFactCollections(criteria_uid?: string): void {
    if (criteria_uid === undefined) {
      this.uwFactCollections = [];
      return;
    }
    let facts = this._middleware.rest.getFacts(
      '',
      '',
      criteria_uid
    );

    let fcs = {} as Record<string, Fact[]>;
    for (let i = 0; i < facts.length; i++) {
      const fact = facts[i];
      if (fcs[fact.type] === undefined) {
        fcs[fact.type] = [];
      }
      fcs[fact.type].push(fact);
    }

    let new_fact_collections = [];
    let ftypes = Object.keys(fcs) as Array<string>;
    for (let i = 0; i < ftypes.length; i++) {
      const ftype = ftypes[i];
      new_fact_collections.push({
        type: ftype,
        facts: fcs[ftype]
      });
    }
    this.uwFactCollections = new_fact_collections;
  }

  public fmtDate(d:Date|undefined): string {
    if (d === undefined) {
      return '-';
    }
    return formatDate(d, 'MM/dd/yyyy', this.locale_id)
  }
}
