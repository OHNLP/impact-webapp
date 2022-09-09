import {Component, OnInit, ViewChild} from '@angular/core';
import {CohortInclusion, PatInfo} from "../../../models/pat-info";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {View} from "../../views";
import {MiddlewareAdapterService} from "../../../services/middleware-adapter.service";
import { Patient } from 'src/app/models/patient';

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

  constructor(public appStatus: ApplicationStatusService, private middleware: MiddlewareAdapterService) { }

  ngOnInit(): void {
    if (this.appStatus.activeProject) {
      this.cohort = this.middleware.rest.getRetrievedCohort(this.appStatus.activeProject.uid)
      this.dataSource = new MatTableDataSource()
      this.dataSource.paginator = this.paginator
      this.dataSource.data = this.cohort
    }
  }

  get inclusionState(): typeof CohortInclusion {
    return CohortInclusion
  }

  public openPatient(pat: PatInfo): void {
    this.appStatus.activeView = View.PROJECT_RELEVANCE_PATIENT_VIEW
    this.appStatus.activePatient = pat
    this.appStatus.activePatientIdx = this.cohort.indexOf(pat)
  }

  public openPlummer(patient: Patient): void {
    this.appStatus.activeView = View.PLUMMER;
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
    if (this.appStatus.activeProject) {
      pat.inclusion = state
      this.middleware.rest.writeRetrievedCohort(this.appStatus.activeProject.uid, this.cohort)
    }

  }
}
