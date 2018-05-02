import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioEmpressaComponent } from './gestio-empressa.component';

describe('GestioEmpressaComponent', () => {
  let component: GestioEmpressaComponent;
  let fixture: ComponentFixture<GestioEmpressaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioEmpressaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioEmpressaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
