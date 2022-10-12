/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PelletsComponent } from './pellets.component';

describe('PelletsComponent', () => {
  let component: PelletsComponent;
  let fixture: ComponentFixture<PelletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PelletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PelletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
