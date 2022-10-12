import { Component, Input, OnInit } from '@angular/core';
import { Fact } from 'src/app/models/clinical-data';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-fact-item',
  templateUrl: './fact-item.component.html',
  styleUrls: ['./fact-item.component.css']
})
export class FactItemComponent implements OnInit {

  @Input() fact?: Fact

  constructor(
    public appStatus: ApplicationStatusService
  ) { }

  ngOnInit(): void {
  }

  onClickViewFullText(): void {
    this.appStatus.uwFact = this.fact;
    // this.appStatus.showFactDetail(this.appStatus.uwFact!);
  }

  getFactRecordDate(fact:Fact|undefined): string {
    let ret = "";

    if (fact == undefined) {
      return 'NA';
    }

    if (Object.keys(fact.fhir).length!=0) {
      if (fact.fhir.hasOwnProperty('recordedDate')) {
        ret += fact.fhir.recordedDate;
      }
    }

    return ret;
  }

  getFactSummary(fact:Fact|undefined): string {
    let ret = "";

    if (fact == undefined) {
      return ret;
    }

    if (Object.keys(fact.fhir).length!=0) {
      if (fact.fhir.hasOwnProperty('code')) {
        if (fact.fhir.code.hasOwnProperty('coding')) {
            ret += fact.fhir.code.coding.map((c: { display: any; })=>c.display).join('|')
        }
      }
    }
    return ret;
  }

}
