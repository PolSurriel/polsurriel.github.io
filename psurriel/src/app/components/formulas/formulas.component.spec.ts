/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormulasComponent } from './formulas.component';

describe('FormulasComponent', () => {
  let component: FormulasComponent;
  let fixture: ComponentFixture<FormulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
