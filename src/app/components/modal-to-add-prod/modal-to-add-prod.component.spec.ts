import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToAddProdComponent } from './modal-to-add-prod.component';

describe('ModalToAddProdComponent', () => {
  let component: ModalToAddProdComponent;
  let fixture: ComponentFixture<ModalToAddProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalToAddProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToAddProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
