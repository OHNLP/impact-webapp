import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { CohortInclusion, PatInfo } from 'src/app/models/pat-info';
import { EXAMPLE_PATIENTS } from 'src/app/samples/sample-patient';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-patient-panel',
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.css']
})
export class PatientPanelComponent implements OnInit {


  public patient: PatInfo = EXAMPLE_PATIENTS[0]

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
    // update UI
    this.appStatus.uwPat!.inclusion = decision;
    // update database
    this.appStatus.setDecision(decision);    
  }

  public getGender(patient: PatInfo | undefined): string {
    if (patient === undefined) {
      return 'NA'
    }
    if (Object.keys(patient.fhir).length > 0) {
      return patient.fhir.gender;
    }
    return 'NA'
  }

  public getAge(patient: PatInfo | undefined): string {
    if (patient === undefined) {
      return 'NA'
    }

    if (Object.keys(patient.fhir).length > 0) {
      let day_birth = dayjs(patient.fhir.birthDate);
      let today = dayjs(new Date());

      let age = today.diff(day_birth, 'year');

      return '' + age;
    }

    return 'NA'
  }


  public getAgeYear(patient: PatInfo | undefined): string {
    if (patient === undefined) {
      return 'NA'
    }

    if (Object.keys(patient.fhir).length > 0) {
      return patient.fhir.birthDate.split('-')[0];
    }

    return 'NA'
  }

}
