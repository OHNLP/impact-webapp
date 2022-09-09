import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactPanelComponent } from './fact-panel.component';

describe('FactPanelComponent', () => {
  let component: FactPanelComponent;
  let fixture: ComponentFixture<FactPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
