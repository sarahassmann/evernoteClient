import { TestBed } from '@angular/core/testing';

import { KwmListService } from './kwm-list.service';

describe('KwmListService', () => {
  let service: KwmListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwmListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
