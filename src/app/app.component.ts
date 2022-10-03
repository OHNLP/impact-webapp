import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {PatientView, View} from "./views/views";
import {ApplicationStatusService} from "./services/application-status.service";
import {MiddlewareAdapterService} from "./services/middleware-adapter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  showProjectOptions: boolean = true;

  View = View;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService
  ) {
  }

  ngOnInit(): void {
    let uc = localStorage.getItem('header_user_credentials');
    if (uc == null) {
      return;
    }

    // this user has already login, just go to project list
    this.appStatus.activeView = View.PROJECT_LIST;
  }

  public get username(): string {
    return localStorage.getItem('username') || '';
  }

  public displayProjectSuboptions(): boolean {
    return this.showProjectOptions && this.appStatus.uwProject != null
  }
}

