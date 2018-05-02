import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestioEmpressaComponent } from './form-gestio-empressa.component';

describe('FormGestioEmpressaComponent', () => {
  let component: FormGestioEmpressaComponent;
  let fixture: ComponentFixture<FormGestioEmpressaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestioEmpressaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestioEmpressaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
