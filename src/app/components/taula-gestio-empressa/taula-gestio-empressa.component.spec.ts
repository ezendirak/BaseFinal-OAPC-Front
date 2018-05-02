import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaGestioEmpressaComponent } from './taula-gestio-empressa.component';

describe('TaulaGestioEmpressaComponent', () => {
  let component: TaulaGestioEmpressaComponent;
  let fixture: ComponentFixture<TaulaGestioEmpressaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaulaGestioEmpressaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaulaGestioEmpressaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
