import { TestBed } from '@angular/core/testing';

import { KwmTodoService } from './kwm-todo.service';

describe('KwmTodoService', () => {
  let service: KwmTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwmTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
