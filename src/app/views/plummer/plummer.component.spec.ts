import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlummerComponent } from './plummer.component';

describe('PlummerComponent', () => {
  let component: PlummerComponent;
  let fixture: ComponentFixture<PlummerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlummerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
