import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPanelComponent } from './doc-panel.component';

describe('DocPanelComponent', () => {
  let component: DocPanelComponent;
  let fixture: ComponentFixture<DocPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
