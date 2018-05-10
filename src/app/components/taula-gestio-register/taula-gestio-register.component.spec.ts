import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaGestioRegisterComponent } from './taula-gestio-register.component';

describe('TaulaGestioRegisterComponent', () => {
  let component: TaulaGestioRegisterComponent;
  let fixture: ComponentFixture<TaulaGestioRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaulaGestioRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaulaGestioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
