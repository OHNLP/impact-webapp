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
  private cohort: Array<PatInfo> = [];
  public search_keywords: string = '';

  public CohortInclusion = CohortInclusion

  displayedColumns: string[] = [
    'mrn', 'name', 
    'stat1', 'stat2', 'stat3', 
    'status', 'label', 'actions'
  ]
  
  public dataSource!: MatTableDataSource<PatInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    public appStatus: ApplicationStatusService, 
    private middleware: MiddlewareAdapterService
  ) { }

  ngOnInit(): void {
    if (this.appStatus.activeProject) {
      this.middleware.rest.getRetrievedCohort(
        this.appStatus.activeProject.uid).subscribe(
          rs => {
            this.cohort = rs
          }
      );
      this.dataSource = new MatTableDataSource()
      this.dataSource.paginator = this.paginator
      this.dataSource.data = this.cohort
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter(event: Event): void {
    this.search_keywords = '';
    this.dataSource.filter = '';
  }

  public openPatient(pat: PatInfo): void {
    this.appStatus.activeView = View.PROJECT_RELEVANCE_PATIENT_VIEW
    this.appStatus.activePatient = pat
    this.appStatus.activePatientIdx = this.cohort.indexOf(pat)
  }

  public openPlummer(pat: PatInfo): void {
    this.appStatus.activeView = View.PLUMMER;
    this.appStatus.uwPat = pat;
  }

  public updateInclusionState(pat: PatInfo, state: CohortInclusion) {
    if (this.appStatus.activeProject) {
      pat.inclusion = state
      this.middleware.rest.writeRetrievedCohort(this.appStatus.activeProject.uid, this.cohort)
    }

  }
}
