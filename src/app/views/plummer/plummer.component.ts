import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Determination } from '../../models/determination';
import { ApplicationStatusService } from '../../services/application-status.service';
import { MiddlewareAdapterService } from '../../services/middleware-adapter.service';
import { View } from '../views';

@Component({
  selector: 'app-plummer',
  templateUrl: './plummer.component.html',
  styleUrls: ['./plummer.component.css']
})
export class PlummerComponent implements OnInit {

  constructor(
    public appStatus: ApplicationStatusService,
    public middleware: MiddlewareAdapterService,
    @Inject( LOCALE_ID )public locale_id: string
  ) { }

  ngOnInit(): void {
    // get the criteria / refresh the criteria
    this.middleware.rest.getCohortCriteria(
      this.appStatus.activeProject!.uid
    ).subscribe(criteria => this.appStatus.uwCriteria = criteria);

    // get the determinations
    this.appStatus.showDeterminations();
  }

  onClickBackToCohort(): void {
    this.appStatus.activeView = View.COHORT_BROWSER;
    this.appStatus.uwPat = undefined;
  }
}
