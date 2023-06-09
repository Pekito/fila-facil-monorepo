import { OrderNotFoundError } from '../errors/index';
import { Order } from './index';

export class OrderList {
  public name: string;
  public orders: Order[];
  public finish?: boolean;
  public notifies?: boolean;
  public client?: boolean;
  constructor(name: string, orders: Order[] = [], finish = false, notifies = false, client = false) {
    this.name = name;
    this.orders = orders;
    this.finish = finish;
    this.notifies = notifies;
    this.client = client;
  }

  public getOrders(): Order[] {
    return this.orders;
  }
  public clear(): void {
    this.orders = [];
  }
  public addOrder(order: Order, index?: number): void {
    if (index !== undefined) this.orders.splice(index, 0, order);
    else this.orders = [...this.orders, order ];
  }

  public removeOrder(orderId: string): void {
    this.orders = this.orders.filter((order) => order.id !== orderId);
  }

  public getOrderById(orderId: string): Order | undefined {
    return this.orders.find((order) => order.id === orderId);
  }
  public getOrderByLabel(orderLabel: string): Order | undefined {
    return this.orders.find((order) => order.label === orderLabel);
  }

  public editOrder(orderToUpdate: Order): void {
    const order = this.getOrderById(orderToUpdate.id);
    if (!order) throw new OrderNotFoundError();
    order.edit(orderToUpdate.description, orderToUpdate.label);
  }
}