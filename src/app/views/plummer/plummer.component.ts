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
  ) { 
    this.appStatus.uwPlummerLoading = true;
  }

  ngOnInit(): void {
    console.log('* initing plummer');
    // get the patient

    // get the criteria / refresh the criteria
    this.appStatus.showCriteria();

    // get the determinations
    // this.appStatus.showDeterminations();
    
    // get determinations and other information
    this.appStatus.loadPlummerDataByPatient();
  }

  onClickBackToCohort(): void {
    this.appStatus.activeView = View.COHORT_BROWSER;
    this.appStatus.uwPat = undefined;
  }

  toggleAdjudicationMode(): void {
    // this.appStatus.uwAdjudicationMode = !this.appStatus.uwAdjudicationMode;
    console.log('* toggle ADJ mode:', this.appStatus.uwAdjudicationMode);

    if (!this.appStatus.uwAdjudicationMode) {
      // the adjudication mode is turned off
      this.appStatus.uwPlummerLoading = false;
      return;
    }

    // need to load other determinations
    this.appStatus.uwPlummerLoading = true;

    // 
  }
}
