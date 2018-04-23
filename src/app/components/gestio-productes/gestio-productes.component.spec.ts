import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioProductesComponent } from './gestio-productes.component';

describe('GestioProductesComponent', () => {
  let component: GestioProductesComponent;
  let fixture: ComponentFixture<GestioProductesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioProductesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioProductesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
