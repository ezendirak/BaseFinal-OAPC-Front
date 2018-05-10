import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTaulaGestioPeriodesComponent } from './button-taula-gestio-periodes.component';

describe('ButtonTaulaGestioPeriodesComponent', () => {
  let component: ButtonTaulaGestioPeriodesComponent;
  let fixture: ComponentFixture<ButtonTaulaGestioPeriodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTaulaGestioPeriodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTaulaGestioPeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
