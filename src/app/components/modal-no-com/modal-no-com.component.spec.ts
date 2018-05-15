import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoComComponent } from './modal-no-com.component';

describe('ModalNoComComponent', () => {
  let component: ModalNoComComponent;
  let fixture: ComponentFixture<ModalNoComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNoComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
