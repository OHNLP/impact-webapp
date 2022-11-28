import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-data-source-editor',
  templateUrl: './data-source-editor.component.html',
  styleUrls: ['./data-source-editor.component.css']
})
export class DataSourceEditorComponent implements OnInit {

  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService,
  ) { }

  ngOnInit(): void {
    console.log('* initing data-source-editor');

    // load all available
    this.appStatus.loadAllDataSources();
  }

}
