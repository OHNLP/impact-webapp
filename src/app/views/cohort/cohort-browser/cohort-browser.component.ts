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

  // Tracks whether changes to cohort relevance have been made
  private dirty: boolean = false 
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
    console.log('* init cohort browser');
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator;

    if (this.appStatus.uwProject) {
      if (this.appStatus.uwJobSelected === undefined) {
        this.dataSource.data = [];
        return;
      }

      // finally, update data source with current co
      if (this.appStatus.uwCohort) {
        this.dataSource.data = this.appStatus.uwCohort
      } else {
        this.dataSource.data = [];
      }
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

  public openPlummer(pat: PatInfo): void {
    this.appStatus.activeView = View.PLUMMER;
    this.appStatus.uwPat = pat;

    // clear facts
    this.appStatus.resetPlummer();
  }

}
