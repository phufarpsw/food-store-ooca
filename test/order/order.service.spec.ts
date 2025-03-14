import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/modules/order/order.service';
import { MenuItemsEnum } from '../../src/modules/order/enum/order.enum';
import { OrderDto } from '../../src/modules/order/dto/order.dto';

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('should calculate total without discounts', () => {
    const order: OrderDto = {
      order: [
        { name: MenuItemsEnum.RED, quantity: 2 },
        { name: MenuItemsEnum.BLUE, quantity: 1 },
      ],
      isMember: false,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(130);
  });

  it('should apply member discount', () => {
    const order: OrderDto = {
      order: [{ name: MenuItemsEnum.RED, quantity: 1 }],
      isMember: true,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(45);
  });

  it('should apply set discount for eligible items', () => {
    const order: OrderDto = {
      order: [{ name: MenuItemsEnum.ORANGE, quantity: 2 }],
      isMember: false,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(228);
  });

  it('should combine multiple discounts correctly', () => {
    const order: OrderDto = {
      order: [
        { name: MenuItemsEnum.PINK, quantity: 3 },
        { name: MenuItemsEnum.GREEN, quantity: 2 },
      ],
      isMember: true,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(273.6);
  });

  it('should merge quantities of the same item', () => {
    const order: OrderDto = {
      order: [
        { name: MenuItemsEnum.RED, quantity: 1 },
        { name: MenuItemsEnum.RED, quantity: 1 },
      ],
      isMember: false,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(100);
  });

  it('should not apply set discount for eligible items with quantity less than 2', () => {
    const order: OrderDto = {
      order: [{ name: MenuItemsEnum.PINK, quantity: 1 }],
      isMember: false,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(80);
  });

  it('should handle empty orders', () => {
    const order: OrderDto = {
      order: [],
      isMember: false,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(0);
  });

  it('should round to 2 decimal places', () => {
    const order: OrderDto = {
      order: [{ name: MenuItemsEnum.RED, quantity: 3 }],
      isMember: true,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(135);
    expect(Number.isInteger(total * 100)).toBeTruthy();
  });

  it('should ignore items not in the menu', () => {
    const order: OrderDto = {
      order: [
        { name: 'INVALID_ITEM' as MenuItemsEnum, quantity: 2 },
        { name: MenuItemsEnum.RED, quantity: 1 },
      ],
      isMember: false,
    };

    const total = orderService.calculateTotal(order);
    expect(total).toBe(50);
  });
});
