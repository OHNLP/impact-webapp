import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {PatInfo} from "./models/pat-info";
import {PatientView, View} from "./views/views";
import {Project} from "./models/project";
import {PatientViewComponent} from "./views/results/patient-view/patient-view.component";
import {ApplicationStatusService} from "./services/application-status.service";
import {MiddlewareAdapterService} from "./services/middleware-adapter.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  showProjectOptions: boolean = true;


  constructor(private breakpointObserver: BreakpointObserver,
              public applicationStatus: ApplicationStatusService,
              public middleware: MiddlewareAdapterService) {
  }

  public get view(): typeof View {
    return View
  }

  public get patientView(): typeof PatientView {
    return PatientView
  }

  public get title(): string {
    switch (this.applicationStatus.activeView) {
      case View.GLOBAL_DASHBOARD:
        return 'Home';
      case View.GLOBAL_PROJECT_LIST:
        return 'Project List';
      case View.PROJECT_DASHBOARD:
        return 'Project Dashboard'
      case View.PROJECT_QUERY_DEFINITION:
        return 'Query Definition';
      case View.PROJECT_COHORT_BROWSER:
        return 'Cohort Browser';
      case View.PROJECT_RELEVANCE_PATIENT_VIEW:
        return 'Patient Details';
    }
  }

  public setPatientView(view: PatientView): void {
    this.applicationStatus.activeView = View.PROJECT_RELEVANCE_PATIENT_VIEW
    this.applicationStatus.activePatientView = view
  }

  public displayProjectSuboptions(): boolean {
    return this.showProjectOptions && this.applicationStatus.activeProject != null
  }
}

