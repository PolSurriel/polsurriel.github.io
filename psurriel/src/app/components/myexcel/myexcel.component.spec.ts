/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyexcelComponent } from './myexcel.component';

describe('MyexcelComponent', () => {
  let component: MyexcelComponent;
  let fixture: ComponentFixture<MyexcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyexcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
