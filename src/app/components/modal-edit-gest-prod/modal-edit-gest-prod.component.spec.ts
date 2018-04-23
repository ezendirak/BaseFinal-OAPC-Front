import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditGestProdComponent } from './modal-edit-gest-prod.component';

describe('ModalEditGestProdComponent', () => {
  let component: ModalEditGestProdComponent;
  let fixture: ComponentFixture<ModalEditGestProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditGestProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditGestProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
