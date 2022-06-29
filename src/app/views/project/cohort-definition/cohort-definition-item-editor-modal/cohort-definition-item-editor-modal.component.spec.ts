import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CohortDefinitionItemEditorModalComponent } from './cohort-definition-item-editor-modal.component';

describe('CohortDefinitionItemEditorModalComponent', () => {
  let component: CohortDefinitionItemEditorModalComponent;
  let fixture: ComponentFixture<CohortDefinitionItemEditorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CohortDefinitionItemEditorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CohortDefinitionItemEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
