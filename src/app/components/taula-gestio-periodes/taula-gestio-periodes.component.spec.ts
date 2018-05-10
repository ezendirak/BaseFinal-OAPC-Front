import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaGestioPeriodesComponent } from './taula-gestio-periodes.component';

describe('TaulaGestioPeriodesComponent', () => {
  let component: TaulaGestioPeriodesComponent;
  let fixture: ComponentFixture<TaulaGestioPeriodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaulaGestioPeriodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaulaGestioPeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
