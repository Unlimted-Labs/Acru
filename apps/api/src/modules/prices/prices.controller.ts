import { Controller, Get } from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller('v1/prices')
export class PricesController {
  constructor(private readonly prices: PricesService) {}

  @Get()
  getPrices() {
    return this.prices.getPrices();
  }
}
