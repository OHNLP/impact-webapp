import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaPanelComponent } from './criteria-panel.component';

describe('CriteriaPanelComponent', () => {
  let component: CriteriaPanelComponent;
  let fixture: ComponentFixture<CriteriaPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
