import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuredDataSummaryComponent } from './structured-data-summary.component';

describe('StructuredDataSummaryComponent', () => {
  let component: StructuredDataSummaryComponent;
  let fixture: ComponentFixture<StructuredDataSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructuredDataSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuredDataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
