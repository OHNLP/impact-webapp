import {Component, OnInit} from '@angular/core';
import {ApplicationStatusService} from "../../../../services/application-status.service";
import {CohortInclusion} from "../../../../models/pat-info";
import {MiddlewareAdapterService} from "../../../../services/middleware-adapter.service";
import {View} from "../../../views";

@Component({
  selector: 'app-patient-nav-snackbar',
  templateUrl: './patient-nav-snackbar.component.html',
  styleUrls: ['./patient-nav-snackbar.component.css']
})
export class PatientNavSnackbarComponent implements OnInit {

  constructor(public appState: ApplicationStatusService, private _middleware: MiddlewareAdapterService) {
  }

  ngOnInit(): void {
  }

  get cohortInclusion(): typeof CohortInclusion {
    return CohortInclusion;
  }

  public writePatientJudgement(judgement: CohortInclusion) {
    this.appState.activePatient!.inclusion = judgement;
    // TODO write patient status change to middleware
  }

  refreshViewToPatientRelative(incr: number) {
    const idx = this.appState.activePatientIdx
    if (idx + incr >= this.appState.activeCohortSize || idx + incr < 0) {
      return;
    } else {
      // Update active patient view to the next patient
      this.appState.activePatientIdx = this.appState.activePatientIdx + incr
      this.appState.activePatient = this._middleware.rest.getRetrievedCohort(this.appState.activeProject!.uid)[this.appState.activePatientIdx]
      // Hackishly refresh view by setting view to something else and changing back
      this.appState.activeView = View.PROJECT_DASHBOARD
      this.appState.activeView = View.PROJECT_RELEVANCE_PATIENT_VIEW
    }
  }
}
