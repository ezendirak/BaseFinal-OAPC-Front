import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToAddMasivoComponent } from './modal-to-add-masivo.component';

describe('ModalToAddMasivoComponent', () => {
  let component: ModalToAddMasivoComponent;
  let fixture: ComponentFixture<ModalToAddMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalToAddMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToAddMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
