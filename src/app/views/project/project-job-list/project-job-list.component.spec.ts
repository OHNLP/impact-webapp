import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectJobListComponent } from './project-job-list.component';

describe('ProjectJobListComponent', () => {
  let component: ProjectJobListComponent;
  let fixture: ComponentFixture<ProjectJobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectJobListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
