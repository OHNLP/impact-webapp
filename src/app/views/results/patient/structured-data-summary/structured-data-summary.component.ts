import {Component, OnInit, ViewChild} from '@angular/core';
import {AnnotatableText, ClinicalDocument, StructuredData} from "../../../../models/clinical-data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MiddlewareAdapterService} from "../../../../services/middleware-adapter.service";
import {ApplicationStatusService} from "../../../../services/application-status.service";

@Component({
  selector: 'app-structured-data-summary',
  templateUrl: './structured-data-summary.component.html',
  styleUrls: ['./structured-data-summary.component.css']
})
export class StructuredDataSummaryComponent implements OnInit {
  private dataelements: Array<StructuredData> = []
  public dataSource!: MatTableDataSource<StructuredData>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private _appstate: ApplicationStatusService,private _middleware: MiddlewareAdapterService) { }

  ngOnInit(): void {
    this.dataelements = this._middleware.rest.getStructuredEvidence(
      this._appstate.activeProject!.uid,
      this._appstate.activePatient!.pat_id,
      this._appstate.selectedPatientCriteriaFilter
    )
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator
    this.dataSource.data = this.dataelements
  }
}
