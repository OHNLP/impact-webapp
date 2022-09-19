import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactItemComponent } from './fact-item.component';

describe('FactItemComponent', () => {
  let component: FactItemComponent;
  let fixture: ComponentFixture<FactItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
