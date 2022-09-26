import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../models/project";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {PatInfo} from "../../../models/pat-info";
import {View} from "../../views";
import {MiddlewareAdapterService} from "../../../services/middleware-adapter.service";
import { EXAMPLE_PROJECTS } from 'src/app/samples/sample-project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public projects: Array<Project> = []

  constructor(
    public appStatus: ApplicationStatusService, 
    public middleware: MiddlewareAdapterService
  ) { }

  ngOnInit(): void {
    this.middleware.rest.get_projects().subscribe(rs => {
      console.log("* loaded " + rs.length + ' projects');
      this.projects = rs;
    });
    
  }

  onClickOpenProject(project: Project): void {
    // set the working project
    this.appStatus.activeProject = project;
  }

  onClickArchiveProject(project: Project): void {
    alert("Archive this Project");
  }

}
