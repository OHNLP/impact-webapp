import {Component, OnInit, ViewChild} from '@angular/core';
import {CohortInclusion, PatInfo} from "../../../models/pat-info";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {View} from "../../views";

@Component({
  selector: 'app-cohort-browser',
  templateUrl: './cohort-browser.component.html',
  styleUrls: ['./cohort-browser.component.css']
})
export class CohortBrowserComponent implements OnInit {

  private cohort: Array<PatInfo> = []
  public dataSource!: MatTableDataSource<PatInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(public applicationStatus: ApplicationStatusService) { }

  ngOnInit(): void {
    // TODO remove debug init
    let i = 0
    while (i < 1000) {
      let pat = new PatInfo()
      pat.mrn = i.toString()
      pat.name = "Test Patient " + i.toString()
      this.cohort.push(pat)
      i += 1
    }
    // TODO end debug init
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator
    this.dataSource.data = this.cohort
  }

  get inclusionState(): typeof CohortInclusion {
    return CohortInclusion
  }

  public openPatient(pat: PatInfo): void {
    this.applicationStatus.activeView = View.PROJECT_RELEVANCE_PATIENT_VIEW
    this.applicationStatus.activePatient = pat
  }

  public getStatus(pat: PatInfo): string {
    switch (pat.inclusion) {
      case CohortInclusion.UNJUDGED:
        return "Not Yet Judged";
      case CohortInclusion.INCLUDE:
        return "Included";
      case CohortInclusion.EXCLUDE:
        return "Excluded";
    }
  }
}
