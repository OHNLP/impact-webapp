import {Injectable} from '@angular/core';
import {PatientView, View} from "../views/views";
import {PatInfo} from "../models/pat-info";
import {Project} from "../models/project";
import {PatientViewComponent} from "../views/results/patient-view/patient-view.component";
import {MiddlewareAdapterService} from "./middleware-adapter.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {
  private _activeView: View = View.GLOBAL_DASHBOARD
  private _activePatientView: PatientView = PatientView.SUMMARY
  private _activePatientViewTabIndex: number = 1
  private _activePatient: PatInfo | undefined
  private _activeProject: Project | undefined
  private _activePatientIdx: number = 0;
  private _activeCohortSize: number = 0;
  private _selectedPatientCriteriaFilter: string | undefined

  constructor(private _middleware: MiddlewareAdapterService) {
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
}
