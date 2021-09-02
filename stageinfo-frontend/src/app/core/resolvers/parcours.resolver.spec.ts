import { TestBed } from '@angular/core/testing';

import { ParcoursResolver } from './parcours.resolver';

describe('ParcoursResolver', () => {
  let resolver: ParcoursResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ParcoursResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
