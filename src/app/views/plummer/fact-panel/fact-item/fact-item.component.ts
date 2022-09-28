import { Component, Input, OnInit } from '@angular/core';
import { Fact } from 'src/app/models/clinical-data';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-fact-item',
  templateUrl: './fact-item.component.html',
  styleUrls: ['./fact-item.component.css']
})
export class FactItemComponent implements OnInit {

  @Input() fact?: Fact

  constructor(
    public appStatus: ApplicationStatusService
  ) { }

  ngOnInit(): void {
  }

  onClickViewFullText(): void {
    this.appStatus.uwFact = this.fact;
  }

}
