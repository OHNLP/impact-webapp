import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fact } from 'src/app/models/clinical-data';
import { CohortDefinition } from 'src/app/models/cohort-definition';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-fact-panel',
  templateUrl: './fact-panel.component.html',
  styleUrls: ['./fact-panel.component.css']
})

export class FactPanelComponent implements OnChanges,OnInit {
  @Input() criteria?: CohortDefinition;
  @Input() facts?: Fact[];

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<Fact>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService,
    ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('* init fact-panel');
  }

  applySortByDate(asc_order: boolean): void {
    this.facts!.sort(
      (a, b) => {
        if (asc_order) {
          return Number(a.date_time) - Number(b.date_time);
        }
        return Number(b.date_time) - Number(a.date_time);
      }
    );
    this.ngOnChanges();
  }

  applySortByScore(asc_order: boolean): void {
    this.facts!.sort(
      (a, b) => {
        if (asc_order) {
          return Number(a.score) - Number(b.score);
        }
        return Number(b.score) - Number(a.score);
      }
    );
    this._updateDataSource();
  }

  ngOnChanges(): void {
    this.applySortByScore(false);
  }

  _updateDataSource(): void {
    this.dataSource = new MatTableDataSource<Fact>(this.facts);
    this.dataSource.paginator = this.paginator;
  }

}
