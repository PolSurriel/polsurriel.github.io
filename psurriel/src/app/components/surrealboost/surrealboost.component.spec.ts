/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SurrealboostComponent } from './surrealboost.component';

describe('SurrealboostComponent', () => {
  let component: SurrealboostComponent;
  let fixture: ComponentFixture<SurrealboostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurrealboostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurrealboostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
