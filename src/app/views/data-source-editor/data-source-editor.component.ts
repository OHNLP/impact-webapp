import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DataSource } from 'src/app/models/data-source';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-data-source-editor',
  templateUrl: './data-source-editor.component.html',
  styleUrls: ['./data-source-editor.component.css']
})
export class DataSourceEditorComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public hasChanged: boolean = false;
  @ViewChild("editor") editor: JsonEditorComponent | undefined;
  
  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService,
  ) { 
    // init the json editor
    this.editorOptions = new JsonEditorOptions()
    // set all allowed modes
    this.editorOptions.mode = 'text';
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; 
  }

  ngOnInit(): void {
    console.log('* initing data-source-editor');

    // load all available
    this.appStatus.loadAllDataSources();
    this.appStatus.loadPrjDataSources();
    this.appStatus.loadJobDataSources();
  }

  getRawJSON(data:any| undefined): string {
    if (data == undefined) {
      return '';
    }
    return "<pre class='raw-json'>" +
      JSON.stringify(data, null, 2) +
    "</pre>";
  }

  onChangeJSONEditor(event: Event): void {
    this.hasChanged = true;
  }

  onClickSaveChanges(): void {
    let obj = this.editor!.get() as unknown as DataSource[];
    console.log('* changed PrjDS JSON', obj);
    this.appStatus.uwPrjDataSources = obj;
    this.appStatus.savePrjDataSources();
    // reset the status
    this.hasChanged = false;
  }
}
