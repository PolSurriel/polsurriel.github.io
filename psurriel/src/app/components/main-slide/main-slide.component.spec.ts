/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MainSlideComponent } from './main-slide.component';

describe('MainSlideComponent', () => {
  let component: MainSlideComponent;
  let fixture: ComponentFixture<MainSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
