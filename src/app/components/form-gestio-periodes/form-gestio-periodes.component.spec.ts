import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestioPeriodesComponent } from './form-gestio-periodes.component';

describe('FormGestioPeriodesComponent', () => {
  let component: FormGestioPeriodesComponent;
  let fixture: ComponentFixture<FormGestioPeriodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestioPeriodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestioPeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
