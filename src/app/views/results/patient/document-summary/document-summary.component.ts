import {Component, OnInit, ViewChild} from '@angular/core';
import {AnnotatableText, ClinicalDocument} from "../../../../models/clinical-document";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-document-summary',
  templateUrl: './document-summary.component.html',
  styleUrls: ['./document-summary.component.css']
})
export class DocumentSummaryComponent implements OnInit {

  private documents: Array<ClinicalDocument> = []
  public dataSource!: MatTableDataSource<ClinicalDocument>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    // TODO Remove debug/filler
    let i = 0
    while (i < 10) {
      let doc = new ClinicalDocument();
      doc.id = i.toString()
      doc.summary = new AnnotatableText()
      doc.summary.text = "Random test text 1\n\nRandom test text 2"
      doc.summary.algorithmSpans = [[7, 11], [17, 18]]
      doc.summary.userSpans = [[12, 16]]
      this.documents.push(doc)
      i += 1
    }
    //TODO End DEBUG
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator
    this.dataSource.data = this.documents
  }

}
