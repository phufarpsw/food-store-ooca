import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { MenuItemsEnum } from './enum/order.enum';

@Injectable()
export class OrderService {
  private readonly MENU_PRICES: Record<MenuItemsEnum, number> = {
    [MenuItemsEnum.RED]: 50,
    [MenuItemsEnum.GREEN]: 40,
    [MenuItemsEnum.BLUE]: 30,
    [MenuItemsEnum.YELLOW]: 50,
    [MenuItemsEnum.PINK]: 80,
    [MenuItemsEnum.PURPLE]: 90,
    [MenuItemsEnum.ORANGE]: 120,
  };

  private readonly DISCOUNT_MEMBER = 0.1;
  private readonly DISCOUNT_SET = 0.05;
  private readonly DISCOUNT_ITEMS = new Set([
    MenuItemsEnum.ORANGE,
    MenuItemsEnum.PINK,
    MenuItemsEnum.GREEN,
  ]);

  calculateTotal(body: OrderDto): number {
    const { order, isMember } = body;

    let totalPrice = 0;
    let discountAmount = 0;

    const mergedOrder = order.reduce(
      (acc, menuItem) => {
        const { name, quantity } = menuItem;
        if (this.MENU_PRICES[name]) {
          acc[name] = (acc[name] || 0) + quantity;
        }
        return acc;
      },
      {} as Record<MenuItemsEnum, number>,
    );

    for (const name in mergedOrder) {
      const quantity = mergedOrder[name];
      const itemPrice = this.MENU_PRICES[name] || 0;
      const itemTotal = itemPrice * quantity;
      totalPrice += itemTotal;

      if (this.DISCOUNT_ITEMS.has(name as MenuItemsEnum) && quantity >= 2) {
        discountAmount += itemTotal * this.DISCOUNT_SET;
      }
    }

    totalPrice -= discountAmount;

    if (isMember) {
      totalPrice *= 1 - this.DISCOUNT_MEMBER;
    }

    return parseFloat(totalPrice.toFixed(2));
  }
}
