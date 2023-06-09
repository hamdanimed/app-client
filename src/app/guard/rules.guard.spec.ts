import { TestBed } from '@angular/core/testing';

import { RulesGuard } from './rules.guard';

describe('RulesGuard', () => {
  let guard: RulesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RulesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
