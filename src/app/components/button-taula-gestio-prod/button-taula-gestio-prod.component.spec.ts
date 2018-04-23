import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTaulaGestioProdComponent } from './button-taula-gestio-prod.component';

describe('ButtonTaulaGestioProdComponent', () => {
  let component: ButtonTaulaGestioProdComponent;
  let fixture: ComponentFixture<ButtonTaulaGestioProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTaulaGestioProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTaulaGestioProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
