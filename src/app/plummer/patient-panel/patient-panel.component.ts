import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Patient, RECRUITMENT_DECISION } from 'src/app/models/patient';
import { EXAMPLE_PATIENT } from 'src/app/models/sample-data';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.css']
})
export class PatientPanelComponent implements OnInit {

  public RECRUITMENT_DECISION = RECRUITMENT_DECISION

  public patient: Patient = EXAMPLE_PATIENT

  constructor(
    public appStatus: ApplicationStatusService,
    @Inject( LOCALE_ID )public locale_id: string
  ) { }

  ngOnInit(): void {
  }



  public decision_text(decision: any): string {
    switch (decision) {
      case RECRUITMENT_DECISION.UNJUDGED:
        return 'Not Decided';
      
      case RECRUITMENT_DECISION.INCLUDED:
        return 'Included';
      
      case RECRUITMENT_DECISION.EXCLUDED:
        return 'Excluded';
    }

    return '';
  }

  public setDecision(decision: RECRUITMENT_DECISION): void {
    this.appStatus.uwPatient!.decision = decision;
  }

}
