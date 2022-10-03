import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApplicationStatusService } from 'src/app/services/application-status.service';
import { MiddlewareAdapterService } from 'src/app/services/middleware-adapter.service';
import { View } from '../../views';

@Component({
  selector: 'app-balogin',
  templateUrl: './balogin.component.html',
  styleUrls: ['./balogin.component.css']
})
export class BALoginComponent implements OnInit {

  hide = true;
  mwserver = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    public appStatus: ApplicationStatusService,
    private middleware: MiddlewareAdapterService,
  ) { }

  ngOnInit(): void {
    // load default value
    let mws = localStorage.getItem(
      'middleware_server'
    );

    if (mws == null) {
      mws = 'mock';
    }
    this.mwserver.setValue(mws);
  }

  userLogin(): void {

    if (this.username.hasError('required') ||
      this.password.hasError('required')) {
      return;
    }
    let u = this.username.getRawValue();
    let p = this.password.getRawValue();
    let m = this.mwserver.getRawValue();

    if (u === null) {
      return;
    }

    if (p === null) {
      return;
    }

    if (m === null) {
      return;
    }

    // set current m
    localStorage.setItem(
      'middleware_server',
      m
    );

    this.appStatus.userLogin(u, p);

  }

  clearUsername(): void {
    this.username.setValue('');
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'Need your username' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Need your password' : '';
  }
}
