import { Component, OnInit } from '@angular/core';
import { JobInfo } from 'src/app/models/job-info';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-project-job-list',
  templateUrl: './project-job-list.component.html',
  styleUrls: ['./project-job-list.component.css']
})
export class ProjectJobListComponent implements OnInit {

  public jobs: JobInfo[] = [];

  constructor(
    public appStatus: ApplicationStatusService, 
    public middleware: MiddlewareAdapterService
  ) { }

  ngOnInit(): void {
    console.log("* init app-project-job-list");

    // load jobs
    this.middleware.rest.get_jobs(this.appStatus.uwProject!.uid).subscribe(rs => {
      // load jobs
      this.jobs = rs;
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
}
