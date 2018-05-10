import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToClosePerComponent } from './modal-to-close-per.component';

describe('ModalToClosePerComponent', () => {
  let component: ModalToClosePerComponent;
  let fixture: ComponentFixture<ModalToClosePerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalToClosePerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToClosePerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
