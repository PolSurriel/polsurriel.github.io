/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BurguerButtonComponent } from './burguer-button.component';

describe('BurguerButtonComponent', () => {
  let component: BurguerButtonComponent;
  let fixture: ComponentFixture<BurguerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurguerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurguerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
