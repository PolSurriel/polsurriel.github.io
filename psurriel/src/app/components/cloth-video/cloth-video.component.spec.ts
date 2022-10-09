/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClothVideoComponent } from './cloth-video.component';

describe('ClothVideoComponent', () => {
  let component: ClothVideoComponent;
  let fixture: ComponentFixture<ClothVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
