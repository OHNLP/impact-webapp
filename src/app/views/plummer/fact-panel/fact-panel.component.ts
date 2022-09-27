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
    // call async method
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<Fact>(this.facts);
    this.dataSource.paginator = this.paginator;
  }

}
