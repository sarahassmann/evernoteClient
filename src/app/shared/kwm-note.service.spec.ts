import { TestBed } from '@angular/core/testing';

import { KwmNoteService } from './kwm-note.service';

describe('KwmNoteService', () => {
  let service: KwmNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwmNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
