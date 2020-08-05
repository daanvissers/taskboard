import { TestBed } from '@angular/core/testing';

import { BurndownChartService } from './burndown-chart.service';

describe('BurndownChartService', () => {
  let service: BurndownChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurndownChartService);
  });
});
