import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../models/project";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {PatInfo} from "../../../models/pat-info";
import {View} from "../../views";
import {MiddlewareAdapterService} from "../../../services/middleware-adapter.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  private projects: Array<Project> = []
  public dataSource!: MatTableDataSource<Project>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(public applicationStatus: ApplicationStatusService, public middleware: MiddlewareAdapterService) { }

  ngOnInit(): void {
    // TODO remove debug init
    let i = 0
    while (i < 100) {
      let project = new Project()
      project.name = "Test project " + i.toString()
      this.projects.push(project)
      i += 1
    }
    // TODO end debug init
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator
    this.dataSource.data = this.projects
  }

  setActiveProject(prj: Project) {
    this.applicationStatus.activeProject = prj
    this.applicationStatus.activeCohortSize = this.middleware.rest.getRetrievedCohort(prj.uid).length
    this.applicationStatus.activeView = View.PROJECT_DASHBOARD
  }
}
