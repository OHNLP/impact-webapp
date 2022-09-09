import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaTreeNodeComponent } from './criteria-tree-node.component';

describe('CriteriaTreeNodeComponent', () => {
  let component: CriteriaTreeNodeComponent;
  let fixture: ComponentFixture<CriteriaTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaTreeNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
