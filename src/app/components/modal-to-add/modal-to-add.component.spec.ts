import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToAddComponent } from './modal-to-add.component';

describe('ModalToAddComponent', () => {
  let component: ModalToAddComponent;
  let fixture: ComponentFixture<ModalToAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalToAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
