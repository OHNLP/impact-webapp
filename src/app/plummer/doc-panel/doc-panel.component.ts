import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-doc-panel',
  templateUrl: './doc-panel.component.html',
  styleUrls: ['./doc-panel.component.css']
})
export class DocPanelComponent implements OnInit {

  constructor(
    public appStatus: ApplicationStatusService
  ) { }

  ngOnInit(): void {
  }

}
