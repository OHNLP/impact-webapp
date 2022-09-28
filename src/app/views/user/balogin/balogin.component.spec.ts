import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BALoginComponent } from './balogin.component';

describe('BALoginComponent', () => {
  let component: BALoginComponent;
  let fixture: ComponentFixture<BALoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BALoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BALoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
