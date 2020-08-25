import { TestBed } from '@angular/core/testing';

import { CanDeactivateTemplateGuard } from './can-deactivate-template.guard';

describe('CanDeactivateTemplateDetailGuard', () => {
  let guard: CanDeactivateTemplateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateTemplateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
