import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortBrowserComponent } from './cohort-browser.component';

describe('CohortBrowserComponent', () => {
  let component: CohortBrowserComponent;
  let fixture: ComponentFixture<CohortBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CohortBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
