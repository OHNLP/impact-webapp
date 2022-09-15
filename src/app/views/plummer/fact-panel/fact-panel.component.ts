import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-fact-panel',
  templateUrl: './fact-panel.component.html',
  styleUrls: ['./fact-panel.component.css']
})
export class FactPanelComponent implements OnInit {

  constructor(
    public appStatus: ApplicationStatusService
  ) { }

  ngOnInit(): void {
  }

}
