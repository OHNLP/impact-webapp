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


  constructor(private breakpointObserver: BreakpointObserver,
              public appStatus: ApplicationStatusService,
              public middleware: MiddlewareAdapterService) {
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

  public get view(): typeof View {
    return View
  }

  public get patientView(): typeof PatientView {
    return PatientView
  }

  public get title(): string {
    switch (this.appStatus.activeView) {
      case View.GLOBAL_DASHBOARD:
        return 'Home';
      case View.PROJECT_LIST:
        return 'Project List';

      case View.PROJECT_JOB_LIST:
        return 'Job List';

      case View.PROJECT_DASHBOARD:
        return 'Project Dashboard'
      case View.PROJECT_QUERY_DEFINITION:
        return 'Query Definition';
      case View.COHORT_BROWSER:
        return 'Cohort Browser';
      case View.PROJECT_RELEVANCE_PATIENT_VIEW:
        return 'Patient Details';
      
      case View.PROJECT_MAKER:
        return 'New Project';
      case View.PLUMMER:
        return 'Patient Assessment';
      case View.USER_LOGIN:
        return 'User Login';
    }
  }

  public setPatientView(view: PatientView): void {
    this.appStatus.activeView = View.PROJECT_RELEVANCE_PATIENT_VIEW
    this.appStatus.activePatientView = view
  }

  public displayProjectSuboptions(): boolean {
    return this.showProjectOptions && this.appStatus.activeProject != null
  }
}

