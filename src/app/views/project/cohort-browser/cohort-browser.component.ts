import {Component, OnInit, ViewChild} from '@angular/core';
import {CohortInclusion, PatInfo} from "../../../models/pat-info";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {View} from "../../views";
import {MiddlewareAdapterService} from "../../../services/middleware-adapter.service";

@Component({
  selector: 'app-cohort-browser',
  templateUrl: './cohort-browser.component.html',
  styleUrls: ['./cohort-browser.component.css']
})
export class CohortBrowserComponent implements OnInit {

  private dirty: boolean = false // Tracks whether changes to cohort relevance have been made
  private cohort: Array<PatInfo> = []
  public dataSource!: MatTableDataSource<PatInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(public applicationStatus: ApplicationStatusService, private middleware: MiddlewareAdapterService) { }

  ngOnInit(): void {
    if (this.applicationStatus.activeProject) {
      this.cohort = this.middleware.rest.getRetrievedCohort(this.applicationStatus.activeProject.uid)
      this.dataSource = new MatTableDataSource()
      this.dataSource.paginator = this.paginator
      this.dataSource.data = this.cohort
    }
  }

  get inclusionState(): typeof CohortInclusion {
    return CohortInclusion
  }

  public openPatient(pat: PatInfo): void {
    this.applicationStatus.activeView = View.PROJECT_RELEVANCE_PATIENT_VIEW
    this.applicationStatus.activePatient = pat
    this.applicationStatus.activePatientIdx = this.cohort.indexOf(pat)
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

  public updateInclusionState(pat: PatInfo, state: CohortInclusion) {
    if (this.applicationStatus.activeProject) {
      pat.inclusion = state
      this.middleware.rest.writeRetrievedCohort(this.applicationStatus.activeProject.uid, this.cohort)
    }

  }
}
