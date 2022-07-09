import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReviewDefinitionSelectionWrapperComponent } from './patient-review-definition-selection-wrapper.component';

describe('PatientReviewDefinitionSelectionWrapperComponent', () => {
  let component: PatientReviewDefinitionSelectionWrapperComponent;
  let fixture: ComponentFixture<PatientReviewDefinitionSelectionWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientReviewDefinitionSelectionWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientReviewDefinitionSelectionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
