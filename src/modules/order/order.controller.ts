import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/calculate')
  calculateOrder(@Body() body: OrderDto) {
    return this.orderService.calculateTotal(body);
  }
}
