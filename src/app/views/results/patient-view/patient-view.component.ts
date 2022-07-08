import {Component, OnDestroy, OnInit} from '@angular/core';
import {PatientView} from "../../views";
import {ApplicationStatusService} from "../../../services/application-status.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {PatientNavSnackbarComponent} from "./patient-nav-snackbar/patient-nav-snackbar.component";

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit, OnDestroy {

  private _snackBarRef: MatSnackBarRef<PatientNavSnackbarComponent> | undefined;

  constructor(public appState: ApplicationStatusService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._snackBarRef = this._snackBar.openFromComponent(PatientNavSnackbarComponent)
  }


  ngOnDestroy(): void {
    this._snackBarRef?.dismiss()
  }

  public get view(): typeof PatientView {
    return PatientView
  }

}
