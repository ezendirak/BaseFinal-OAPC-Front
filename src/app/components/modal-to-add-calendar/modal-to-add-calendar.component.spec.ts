import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToAddCalendarComponent } from './modal-to-add-calendar.component';

describe('ModalToAddCalendarComponent', () => {
  let component: ModalToAddCalendarComponent;
  let fixture: ComponentFixture<ModalToAddCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalToAddCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToAddCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
