import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { documentGuard } from './document.guard';

describe('documentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => documentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
