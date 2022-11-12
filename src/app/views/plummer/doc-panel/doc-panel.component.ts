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
      // if it's from nlp?
      if (fact.data_source == 'nlp') {
        return this.get_html_by_FHIR_NLP(fact);
      } else {
        return this.get_html_by_FHIR_EHR(fact);
      }
    }

    if (fact.full_text != undefined) {
      return fact.full_text;
    }

    return 'NA';
  }

  parse_fhir_note(fhir:any): string {
    if (!fhir.hasOwnProperty('content')) {
      return '';
    }

    if (fhir.content instanceof Array &&
        fhir.content.length > 0) {
      
      let note_b64 = fhir.content[0]['attachment']['data'];
      let note_txt = atob(note_b64);
      // let note_txt = Buffer.from(note_b64, 'base64').toString();

      return note_txt;
    }

    return '';
  }

  highlight_parse_fhir_note(fhir:any): string {
    let note = this.parse_fhir_note(fhir);

    // get numbers
    // for (let i = 0; i < fhir.contained.length; i++) {
    //   // each c is a code?
    //   const c = fhir.contained[i];
    //   // get offset location
    //   let offset = c['extension'][0]['valueString'];
    //   let token = c['extension'][1]['valueString'];
    // }
    let offset = parseInt(fhir.contained[0]['extension'][0]['valueString']);
    let token = fhir.contained[0]['extension'][1]['valueString'];

    // just highlight one
    let highlighted_note = note.substring(0, offset) + 
      "<mark class='note-mark'>" +
      token +
      "</mark>" +
      note.substring(offset + token.length);

    return highlighted_note;
  }

  get_html_by_FHIR_NLP(fact: Fact): string {
    if (fact.type == EntityType.CONDITION) {
      let note_data = this.highlight_parse_fhir_note(fact.fhir);
      return `
        <h3>${fact.type}</h3>
        <p>Date: ${fact.fhir.date}</p>
        <p>Code: ${fact.fhir.contained[0].code.coding[0].display}</p>
        <h4>Content</h4>
        <pre class="note">${note_data}</pre>
      `;
    }

    if (fact.type == EntityType.DIAGNOSIS) {
      let note_data = this.highlight_parse_fhir_note(fact.fhir);
      return `
        <h3>${fact.type}</h3>
        <p>Date: ${fact.fhir.date}</p>
        <h4>Content</h4>
        <pre class="note">${note_data}</pre>
      `;
    }

    if (fact.type == EntityType.MEDICATION) {
      let note_data = this.highlight_parse_fhir_note(fact.fhir);
      return `
        <h3>${fact.type}</h3>
        <p>Date: ${fact.fhir.date}</p>
        <p>Code: ${fact.fhir.contained[0].medicationCodeableConcept.coding[0].display}</p>
        <h4>Content</h4>
        <pre class="note">${note_data}</pre>
      `;
    }

    return "<pre class='raw-json'>" +
      JSON.stringify(fact.fhir, null, 4) +
      "</pre>";
  }

  get_html_by_FHIR_EHR(fact: Fact): string {
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
}
