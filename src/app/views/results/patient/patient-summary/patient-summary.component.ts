import {Component, OnInit} from '@angular/core';
import {ApplicationStatusService} from "../../../../services/application-status.service";
import {MiddlewareAdapterService} from "../../../../services/middleware-adapter.service";
import {CriteriaMatchState} from "../../../../models/cohort-definition";
import {CohortInclusion} from "../../../../models/pat-info";

@Component({
  selector: 'app-patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.css']
})
export class PatientSummaryComponent implements OnInit {
  pat_match_state: CriteriaMatchState = CriteriaMatchState.UNKNOWN;
  constructor(public _appstatus: ApplicationStatusService, private _middleware: MiddlewareAdapterService) {
  }

  ngOnInit(): void {
    // let match_state =  this._middleware.rest.getCohortCriteria(this._appstatus.activeProject!.uid)!.match_state
    let match_state = CriteriaMatchState.UNKNOWN
    this.pat_match_state =  match_state ? match_state : CriteriaMatchState.UNKNOWN
  }



  classForMatchState(match_status: CriteriaMatchState | undefined): string {
    switch (match_status) {
      case CriteriaMatchState.CONFIRMED_MATCH:
        return "confirmed-match";
      case CriteriaMatchState.ALGORITHMIC_MATCH:
        return "algorithmic-match";
      case CriteriaMatchState.ALGORITHMIC_MATCH_NLP:
        return "algorithmic-match-nlp";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP:
        return "algorithmic-mismatch-nlp";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH:
        return "algorithmic-mismatch";
      case CriteriaMatchState.CONFIRMED_MISMATCH:
        return "confirmed-mismatch";
      default:
        return "undetermined-match"
    }
  }

  displayNameForMatchState(match_status: CriteriaMatchState): string {
    switch(match_status) {
      case CriteriaMatchState.CONFIRMED_MATCH:
        return "Meets Criteria";
      case CriteriaMatchState.ALGORITHMIC_MATCH:
        return "Algorithmically Meets Criteria (Pending Manual Review)";
      case CriteriaMatchState.ALGORITHMIC_MATCH_NLP:
        return "Algorithmically Meets Criteria (Pending Manual Review - Uses NLP Data)";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH_NLP:
        return "Algorithmically Fails to Meet Criteria (Pending Manual Review - Uses NLP Data)";
      case CriteriaMatchState.ALGORITHMIC_MISMATCH:
        return "Algorithmically Fails to Meet Criteria (Pending Manual Review)";
      case CriteriaMatchState.CONFIRMED_MISMATCH:
        return "Fails to Meet Criteria";
      case CriteriaMatchState.UNKNOWN:
        return "UNKNOWN";
      }
    return '??';
  }

  displayInclusionStatus(inclusion: CohortInclusion): string {
    switch (inclusion) {
      case CohortInclusion.UNJUDGED:
        return "Unjudged";
      case CohortInclusion.INCLUDE:
        return "Included";
      case CohortInclusion.EXCLUDE:
        return "Excluded";

    }
  }
}
