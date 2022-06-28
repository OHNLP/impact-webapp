import {Component, OnInit} from '@angular/core';
import {PatientView} from "../../views";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

  public tabindex: number = 1

  constructor(public appState: ApplicationStatusService) { }

  ngOnInit(): void {

  }

  public get view(): typeof PatientView {
    return PatientView
  }

}
