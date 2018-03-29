import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonListNotesComponent } from './button-list-notes.component';

describe('ButtonListNotesComponent', () => {
  let component: ButtonListNotesComponent;
  let fixture: ComponentFixture<ButtonListNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonListNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonListNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
