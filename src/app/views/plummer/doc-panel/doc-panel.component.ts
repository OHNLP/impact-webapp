import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-doc-panel',
  templateUrl: './doc-panel.component.html',
  styleUrls: ['./doc-panel.component.css']
})
export class DocPanelComponent implements OnInit {
  public html: string = '';

  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService
  ) { }

  ngOnInit(): void {
  }

}
