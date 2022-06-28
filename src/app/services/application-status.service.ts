import { Injectable } from '@angular/core';
import {PatientView, View} from "../views/views";
import {PatInfo} from "../models/pat-info";
import {Project} from "../models/project";
import {PatientViewComponent} from "../views/results/patient-view/patient-view.component";

@Injectable({
  providedIn: 'root'
})
export class ApplicationStatusService {
  private _activeView: View = View.GLOBAL_DASHBOARD
  private _activePatientView: PatientView = PatientView.SUMMARY
  private _activePatient: PatInfo | undefined // TODO remove debug
  private _activeProject: Project | undefined// TODO remove debug
  constructor() { }

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
    this._activeProject = value;
  }

  public resetView(): void {
    this.activeView = View.GLOBAL_DASHBOARD
    this.activePatientView = PatientView.SUMMARY
  }

  public resetPatientView(): void {
    this.activePatientView = PatientView.SUMMARY
  }
}
