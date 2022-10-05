import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JobInfo, JobInfoStatus } from 'src/app/models/job-info';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-project-job-list',
  templateUrl: './project-job-list.component.html',
  styleUrls: ['./project-job-list.component.css']
})
export class ProjectJobListComponent implements OnInit {

  displayedColumns: string[] = [
    'icon', 'date', 'status', 'actions', 
  ]

  JobInfoStatus = JobInfoStatus
  
  public dataSource!: MatTableDataSource<JobInfo>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    public appStatus: ApplicationStatusService, 
    public middleware: MiddlewareAdapterService
  ) { }

  ngOnInit(): void {
    console.log("* init app-project-job-list");
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;

    // load jobs
    this.middleware.rest.get_jobs(this.appStatus.uwProject!.uid).subscribe(rs => {
      // load jobs
      this.appStatus.uwJobs = rs;
      this.dataSource.data = this.appStatus.uwJobs;
    });
  }

  onClickSubmitNewJob(): void {
    var ret = window.confirm(
      "Are you sure to submit a new job?"
    );

    if (ret) {
      this.appStatus.submitNewJob();
    } else {
      // nothing to do
    }
  }

  onClickSelectJob(job: JobInfo): void {
    this.appStatus.uwJobSelected = job;
  }

  isCancelAble(job: JobInfo): boolean {
    if (job.status == JobInfoStatus.COMPLETE) {
      return false;
    } else if (job.status == JobInfoStatus.CANCELED) {
      return false;
    }
    return true;
  }

  onClickCancelJob(job: JobInfo): void {
    this.appStatus.cancelJob(job);
  }

  onClickRefresh(): void {
    // load jobs
    this.middleware.rest.get_jobs(this.appStatus.uwProject!.uid).subscribe(rs => {
      // load jobs
      this.appStatus.uwJobs = rs;
      this.dataSource.data = this.appStatus.uwJobs;
    });
  }
}
