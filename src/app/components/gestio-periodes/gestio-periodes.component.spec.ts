import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioPeriodesComponent } from './gestio-periodes.component';

describe('GestioPeriodesComponent', () => {
  let component: GestioPeriodesComponent;
  let fixture: ComponentFixture<GestioPeriodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioPeriodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioPeriodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
