import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestioProductesComponent } from './form-gestio-productes.component';

describe('FormGestioProductesComponent', () => {
  let component: FormGestioProductesComponent;
  let fixture: ComponentFixture<FormGestioProductesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGestioProductesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestioProductesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
