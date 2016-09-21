/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CozyDatePickerComponent } from './cozy-date-picker.component';

describe('Component: CozyDatePicker', () => {
  it('should create an instance', () => {
    let component = new CozyDatePickerComponent();
    expect(component).toBeTruthy();
  });
});
