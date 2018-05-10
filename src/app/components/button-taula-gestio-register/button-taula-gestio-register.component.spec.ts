import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTaulaGestioRegisterComponent } from './button-taula-gestio-register.component';

describe('ButtonTaulaGestioRegisterComponent', () => {
  let component: ButtonTaulaGestioRegisterComponent;
  let fixture: ComponentFixture<ButtonTaulaGestioRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTaulaGestioRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTaulaGestioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
