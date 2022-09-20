import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CohortInclusion, PatInfo } from 'src/app/models/pat-info';
import { EXAMPLE_PATIENT } from 'src/app/samples/sample-patient';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.css']
})
export class PatientPanelComponent implements OnInit {


  public patient: PatInfo = EXAMPLE_PATIENT

  constructor(
    public appStatus: ApplicationStatusService,
    @Inject( LOCALE_ID )public locale_id: string
  ) { }

  ngOnInit(): void {
  }



  public decision_text(decision: any): string {
    switch (decision) {
      case CohortInclusion.UNJUDGED:
        return 'Not Decided';
      
      case CohortInclusion.INCLUDE:
        return 'Included';
      
      case CohortInclusion.EXCLUDE:
        return 'Excluded';
    }

    return '';
  }

  public setDecision(decision: CohortInclusion): void {
    this.appStatus.uwPat!.inclusion = decision;
  }

}
