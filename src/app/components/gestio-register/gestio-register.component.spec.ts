import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioRegisterComponent } from './gestio-register.component';

describe('GestioRegisterComponent', () => {
  let component: GestioRegisterComponent;
  let fixture: ComponentFixture<GestioRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
