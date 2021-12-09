import { TestBed } from '@angular/core/testing';

import { ClubsHttpService } from './clubs-http.service';

describe('ClubsHttpService', () => {
  let service: ClubsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
