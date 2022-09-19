import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fact } from 'src/app/models/clinical-data';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-fact-panel',
  templateUrl: './fact-panel.component.html',
  styleUrls: ['./fact-panel.component.css']
})


export class FactPanelComponent implements AfterViewInit,OnInit {
  @Input() facts?: Fact[];
  displayedColumns: string[] = ['item'];
  dataSource = new MatTableDataSource<Fact>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public appStatus: ApplicationStatusService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Fact>(this.appStatus.uwFacts);
    this.dataSource.paginator = this.paginator;
  }

}
