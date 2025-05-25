import { TestBed } from '@angular/core/testing';

import { NgxsActionCollectorService } from './ngxs-action-collector.service';
import { Actions } from '@ngxs/store';
import { of } from 'rxjs';

describe('NgxsActionCollectorService', () => {
  let service: NgxsActionCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Actions, useValue: of(),
      }],
    });
    service = TestBed.inject(NgxsActionCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
