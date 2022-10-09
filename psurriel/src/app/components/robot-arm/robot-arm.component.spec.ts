/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RobotArmComponent } from './robot-arm.component';

describe('RobotArmComponent', () => {
  let component: RobotArmComponent;
  let fixture: ComponentFixture<RobotArmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotArmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotArmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
