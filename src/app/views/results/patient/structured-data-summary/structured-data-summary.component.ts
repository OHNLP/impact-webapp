import {Component, OnInit, ViewChild} from '@angular/core';
import {AnnotatableText, ClinicalData, StructuredData} from "../../../../models/clinical-data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-structured-data-summary',
  templateUrl: './structured-data-summary.component.html',
  styleUrls: ['./structured-data-summary.component.css']
})
export class StructuredDataSummaryComponent implements OnInit {
  private dataelements: Array<StructuredData> = []
  public dataSource!: MatTableDataSource<StructuredData>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    // TODO Remove debug/filler
    let i = 0
    while (i < 100) {
      this.dataelements.push({
        code_system: 'ICD-9-CM',
        code: i.toString(),
        desc: "Full text name of " + i.toString(),
        dtm: new Date(1900, 0, 1)
      })
      i += 1
    }
    //TODO End DEBUG
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator
    this.dataSource.data = this.dataelements
  }
}
