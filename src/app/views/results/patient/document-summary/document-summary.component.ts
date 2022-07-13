import {Component, OnInit, ViewChild} from '@angular/core';
import {AnnotatableText, ClinicalDocument} from "../../../../models/clinical-data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationStatusService} from "../../../../services/application-status.service";
import {MiddlewareAdapterService} from "../../../../services/middleware-adapter.service";

@Component({
  selector: 'app-document-summary',
  templateUrl: './document-summary.component.html',
  styleUrls: ['./document-summary.component.css']
})
export class DocumentSummaryComponent implements OnInit {

  private documents: Array<ClinicalDocument> = []
  public dataSource!: MatTableDataSource<ClinicalDocument>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private _appstate: ApplicationStatusService,private _middleware: MiddlewareAdapterService) { }

  ngOnInit(): void {
    this.documents = this._middleware.rest.getUnstructuredEvidence(
      this._appstate.activeProject!.uid,
      this._appstate.activePatient!.mrn,
      this._appstate.selectedPatientCriteriaFilter
    )
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator
    this.dataSource.data = this.documents
  }

}
