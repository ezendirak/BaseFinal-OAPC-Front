import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaGestioProductesComponent } from './taula-gestio-productes.component';

describe('TaulaGestioProductesComponent', () => {
  let component: TaulaGestioProductesComponent;
  let fixture: ComponentFixture<TaulaGestioProductesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaulaGestioProductesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaulaGestioProductesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
