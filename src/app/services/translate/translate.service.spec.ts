import { TestBed } from '@angular/core/testing';

import { TranslateTools } from './translate.service';

describe('TranslateService', () => {
  let service: TranslateTools;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateTools);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
