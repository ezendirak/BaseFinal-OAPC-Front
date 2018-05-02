import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToAddEmpComponent } from './modal-to-add-emp.component';

describe('ModalToAddEmpComponent', () => {
  let component: ModalToAddEmpComponent;
  let fixture: ComponentFixture<ModalToAddEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalToAddEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToAddEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
