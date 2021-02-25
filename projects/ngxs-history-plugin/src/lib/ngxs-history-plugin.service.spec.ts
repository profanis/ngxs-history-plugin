import { TestBed } from '@angular/core/testing';

import { NgxsHistoryPluginService } from './ngxs-history-plugin.service';

describe('NgxsHistoryPluginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxsHistoryPluginService = TestBed.get(NgxsHistoryPluginService);
    expect(service).toBeTruthy();
  });
});
