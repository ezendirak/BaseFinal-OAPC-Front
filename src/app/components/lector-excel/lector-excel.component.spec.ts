import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorExcelComponent } from './lector-excel.component';

describe('LectorExcelComponent', () => {
  let component: LectorExcelComponent;
  let fixture: ComponentFixture<LectorExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
