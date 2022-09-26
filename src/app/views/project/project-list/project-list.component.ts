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

  constructor(public appStatus: ApplicationStatusService, public middleware: MiddlewareAdapterService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.middleware.rest.get_projects().subscribe(rs => {
      console.log("* loaded " + rs.length + ' projects');
      this.projects = rs;
      this.dataSource.data = this.projects;
    });
    
  }

}
