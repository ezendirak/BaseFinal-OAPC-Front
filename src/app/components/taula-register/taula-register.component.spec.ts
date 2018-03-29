import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaulaRegisterComponent } from './taula-register.component';

describe('TaulaRegisterComponent', () => {
  let component: TaulaRegisterComponent;
  let fixture: ComponentFixture<TaulaRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaulaRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaulaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
