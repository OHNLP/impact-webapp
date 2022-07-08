import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNavSnackbarComponent } from './patient-nav-snackbar.component';

describe('PatientNavSnackbarComponent', () => {
  let component: PatientNavSnackbarComponent;
  let fixture: ComponentFixture<PatientNavSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientNavSnackbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientNavSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
