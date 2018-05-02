import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditGestEmpComponent } from './modal-edit-gest-emp.component';

describe('ModalEditGestEmpComponent', () => {
  let component: ModalEditGestEmpComponent;
  let fixture: ComponentFixture<ModalEditGestEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditGestEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditGestEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
