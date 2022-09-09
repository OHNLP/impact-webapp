import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPanelComponent } from './patient-panel.component';

describe('PatientPanelComponent', () => {
  let component: PatientPanelComponent;
  let fixture: ComponentFixture<PatientPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
