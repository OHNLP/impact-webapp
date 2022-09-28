import { Component, OnInit } from '@angular/core';
import { ApplicationStatusService } from 'src/app/services/application-status.service';

@Component({
  selector: 'app-label-box',
  templateUrl: './label-box.component.html',
  styleUrls: ['./label-box.component.css']
})
export class LabelBoxComponent implements OnInit {

  constructor(
    public appStatus: ApplicationStatusService
  ) { }

  ngOnInit(): void {
  }

  onClickAddLabel(): void {
    var ret = window.prompt('A new label for this patient?');
    if (ret) {
      this.appStatus.uwPat?.labels?.push(ret);
    } else {
      // nothing happens
    }
  }

  onClickDeleteLabel(lbl: string): void {

  }
}
