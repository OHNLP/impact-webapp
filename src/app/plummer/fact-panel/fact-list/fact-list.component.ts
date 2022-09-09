import { Component, Input, OnInit } from '@angular/core';
import { Fact, FactCollection } from 'src/app/models/clinical-data';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-fact-list',
  templateUrl: './fact-list.component.html',
  styleUrls: ['./fact-list.component.css']
})
export class FactListComponent implements OnInit {

  @Input() fact_collection?: FactCollection

  constructor(
    public appStatus: ApplicationStatusService
  ) { }

  ngOnInit(): void {
  }

}
