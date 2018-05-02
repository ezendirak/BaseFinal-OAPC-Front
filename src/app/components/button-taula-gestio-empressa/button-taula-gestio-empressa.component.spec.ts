import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTaulaGestioEmpressaComponent } from './button-taula-gestio-empressa.component';

describe('ButtonTaulaGestioEmpressaComponent', () => {
  let component: ButtonTaulaGestioEmpressaComponent;
  let fixture: ComponentFixture<ButtonTaulaGestioEmpressaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTaulaGestioEmpressaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTaulaGestioEmpressaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
