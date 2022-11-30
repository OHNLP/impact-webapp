import {Component, OnInit, ViewChild} from '@angular/core';
import {CohortInclusion, CohortMatch, PatInfo} from "../../../models/pat-info";
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
  public filter_match: string = 'all';

  public CohortInclusion = CohortInclusion

  displayedColumns: string[] = [
    'mrn',  // Patient ID or MRN
    'name', // Patient Name
    // 'stat1', // Age
    'stat2', // N inclusion matched
    'stat3', // N exclusion matched
    'nlp_rst', // the NLP result
    'status', // Decision
    'label', // User customized labels
    'actions' // Actions
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

  calcMatch(pat: PatInfo): string {
    if (pat.stat!.n_criteria_no > 0) {
      return 'Unmatched';
    } else if (pat.match == CohortMatch.MATCHED) {
      return 'Matched';
    } else {
      return 'Unknown';
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.updateFilters();
  }

  clearFilter(event: Event): void {
    this.search_keywords = '';
    this.updateFilters();
  }

  updateFilters(): void {
    // get filter text
    let f_text = this.search_keywords.trim().toLowerCase();
    console.log("* updateFilters: " + this.filter_match + ', ' + f_text);
    
    if (this.filter_match == 'all') {
      this.dataSource.filter = f_text;
      
    } else if (this.filter_match == 'only_matched') {
      this.dataSource.filter = f_text + ' ' + CohortMatch.MATCHED;

    } else {
      this.dataSource.filter = f_text;
    }
  }

  public openPlummer(pat: PatInfo): void {
    this.appStatus.activeView = View.PLUMMER;
    this.appStatus.uwPat = pat;

    // clear facts
    this.appStatus.resetPlummer();
  }

  public onClickRefreshCohort(): void {
    this.appStatus.showCohort();
  }

}
