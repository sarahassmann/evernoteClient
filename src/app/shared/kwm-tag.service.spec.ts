import { TestBed } from '@angular/core/testing';

import { KwmTagService } from './kwm-tag.service';

describe('KwmTagService', () => {
  let service: KwmTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwmTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
