import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dashAuthGuard } from './dash-auth.guard';

describe('dashAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dashAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
