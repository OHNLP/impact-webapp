import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';

@Component({
  selector: 'app-project-maker',
  templateUrl: './project-maker.component.html',
  styleUrls: ['./project-maker.component.css']
})
export class ProjectMakerComponent implements OnInit {


  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService,
  ) { }

  ngOnInit(): void {
  }

}
