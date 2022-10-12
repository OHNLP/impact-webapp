import { Component, Input, OnInit } from '@angular/core';
import { Fact } from 'src/app/models/clinical-data';
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

  getHTML(): string {

    if (this.fact == undefined) {
      return ''
    }

    if (Object.keys(this.fact.fhir).length != 0) {
      // if having FHIR, just show the content for now
      return JSON.stringify(this.fact.fhir, null, 4);
    }

    if (this.fact.full_text != undefined) {
      return this.fact.full_text;
    }

    return 'NA';
  }
}
