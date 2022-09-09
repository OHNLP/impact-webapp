import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaTreeTableComponent } from './criteria-tree-table.component';

describe('CriteriaTreeTableComponent', () => {
  let component: CriteriaTreeTableComponent;
  let fixture: ComponentFixture<CriteriaTreeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaTreeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaTreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
