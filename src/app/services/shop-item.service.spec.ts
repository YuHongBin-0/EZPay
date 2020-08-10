import { TestBed } from '@angular/core/testing';

import { ShopItemService } from './shop-item.service';

describe('ShopItemService', () => {
  let service: ShopItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopItemService);
  });

  it('should be created', () => {
    const service: ShopItemService = TestBed.get(ShopItemService);
    expect(service).toBeTruthy();
  });
});
