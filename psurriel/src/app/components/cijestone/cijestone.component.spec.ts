/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CijestoneComponent } from './cijestone.component';

describe('CijestoneComponent', () => {
  let component: CijestoneComponent;
  let fixture: ComponentFixture<CijestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CijestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CijestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
