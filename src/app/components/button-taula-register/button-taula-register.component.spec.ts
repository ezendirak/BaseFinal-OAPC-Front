import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTaulaRegisterComponent } from './button-taula-register.component';

describe('ButtonTaulaRegisterComponent', () => {
  let component: ButtonTaulaRegisterComponent;
  let fixture: ComponentFixture<ButtonTaulaRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTaulaRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTaulaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
