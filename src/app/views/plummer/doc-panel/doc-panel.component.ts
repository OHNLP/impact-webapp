import { Component, Input, OnInit } from '@angular/core';
import { Fact } from 'src/app/models/clinical-data';
import { EntityType } from 'src/app/models/cohort-definition';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-doc-panel',
  templateUrl: './doc-panel.component.html',
  styleUrls: ['./doc-panel.component.css']
})
export class DocPanelComponent implements OnInit {

  @Input() fact: Fact | undefined

  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService
  ) { }

  ngOnInit(): void {
  }

  toggleRawJSON(): void {
    this.appStatus.uwDocShowRawJSON = !this.appStatus.uwDocShowRawJSON;
  }

  getRawJSON(fact: Fact | undefined): string {
    if (fact == undefined) {
      return ''
    }

    return "<pre class='raw-json'>" +
      JSON.stringify(fact.fhir, null, 2) +
      "</pre>";
  }

  getHTML(fact: Fact | undefined): string {

    if (fact == undefined) {
      return ''
    }

    if (Object.keys(fact.fhir).length != 0) {
      // if having FHIR, just show the content for now
      if (fact.type == EntityType.OBSERVATION) {
        return `
        <h3>${fact.type}</h3>
        <p>Issued: ${fact.fhir.issued}</p>
        <p>Patient ID: ${fact.fhir.subject.identifier.value}</p>
        <dl>
           <dt>${fact.fhir.code.coding[0].display}</dt>
           <dd>${fact.fhir.valueString}</dd>
        </dl>
        `
      }

      if (fact.type == EntityType.CONDITION) {
        return `
        <h3>${fact.type}</h3>
        <p>Recorded Date: ${fact.fhir.recordedDate}</p>
        <p>Patient ID: ${fact.fhir.subject.identifier.value}</p>
        <dl>
           <dt>${fact.fhir.code.coding[0].display}</dt>
           <dd>${fact.fhir.valueString}</dd>
        </dl>
        `
      }

      return "<pre class='raw-json'>" +
      JSON.stringify(fact.fhir, null, 4) +
      "</pre>";
    }

    if (fact.full_text != undefined) {
      return fact.full_text;
    }

    return 'NA';
  }
}
