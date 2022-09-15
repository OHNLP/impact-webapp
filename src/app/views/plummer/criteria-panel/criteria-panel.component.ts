import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-criteria-panel',
  templateUrl: './criteria-panel.component.html',
  styleUrls: ['./criteria-panel.component.css']
})
export class CriteriaPanelComponent implements OnInit {

  constructor(
    public appStatus: ApplicationStatusService,
  ) { }

  ngOnInit(): void {
  }

}
