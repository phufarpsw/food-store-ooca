import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../../src/modules/order/order.controller';
import { OrderService } from '../../src/modules/order/order.service';
import { OrderDto } from '../../src/modules/order/dto/order.dto';
import { MenuItemsEnum } from '../../src/modules/order/enum/order.enum';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            calculateTotal: jest.fn(),
          },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  it('should call calculateTotal and return correct result', async () => {
    const order: OrderDto = {
      order: [
        { name: MenuItemsEnum.RED, quantity: 2 },
        { name: MenuItemsEnum.GREEN, quantity: 1 },
      ],
      isMember: false,
    };

    const calculatedTotal = 140;
    jest.spyOn(orderService, 'calculateTotal').mockReturnValue(calculatedTotal);

    const result = await orderController.calculateOrder(order);

    expect(result).toBe(calculatedTotal);
    expect(orderService.calculateTotal).toHaveBeenCalledWith(order);
  });

  it('should handle empty orders and return 0', async () => {
    const emptyOrder: OrderDto = {
      order: [],
      isMember: false,
    };

    const calculatedTotal = 0;
    jest.spyOn(orderService, 'calculateTotal').mockReturnValue(calculatedTotal);

    const result = await orderController.calculateOrder(emptyOrder);

    expect(result).toBe(calculatedTotal);
    expect(orderService.calculateTotal).toHaveBeenCalledWith(emptyOrder);
  });

  it('should return 0 for invalid menu items', async () => {
    const order: OrderDto = {
      order: [
        { name: 'INVALID_ITEM' as MenuItemsEnum, quantity: 2 },
        { name: MenuItemsEnum.RED, quantity: 1 },
      ],
      isMember: false,
    };

    const calculatedTotal = 50;
    jest.spyOn(orderService, 'calculateTotal').mockReturnValue(calculatedTotal);

    const result = await orderController.calculateOrder(order);

    expect(result).toBe(calculatedTotal);
    expect(orderService.calculateTotal).toHaveBeenCalledWith(order);
  });
});
