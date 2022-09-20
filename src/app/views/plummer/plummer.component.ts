import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Determination } from '../../models/Determination';
import { ApplicationStatusService } from '../../services/application-status.service';
import { MiddlewareAdapterService } from '../../services/middleware-adapter.service';

@Component({
  selector: 'app-plummer',
  templateUrl: './plummer.component.html',
  styleUrls: ['./plummer.component.css']
})
export class PlummerComponent implements OnInit {

  public patient_uid = 'test_pid';

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
    this.middleware.rest.get_determinations(
      '',
      this.appStatus.uwPat!.pat_id,
    ).subscribe(ds => {
      // to dictionary
      type dtmnRecord = Record<string, Determination>;
      let dd: dtmnRecord = {};

      for (let i = 0; i < ds.length; i++) {
        // use criteria's id as key
        dd[ds[i].criteria_uid] = ds[i];
      }

      this.appStatus.uwDeterminationDict = dd;
    });
    
  }

}
