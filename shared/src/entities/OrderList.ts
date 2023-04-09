import { OrderNotFoundError } from '../errors';
import { Order } from './';

export class OrderList {
  private orders: Order[];

  constructor(orders: Order[] = []) {
    this.orders = orders;
  }

  public getOrders(): Order[] {
    return this.orders;
  }

  public addOrder(order: Order, index?: number): void {
    if (index !== undefined) this.orders.splice(index, 0, order);
    else this.orders.push(order);
  }

  public removeOrder(orderId: string): void {
    this.orders = this.orders.filter((order) => order.id !== orderId);
  }

  public getOrderById(orderId: string): Order | undefined {
    return this.orders.find((order) => order.id === orderId);
  }

  public editOrder(orderToUpdate: Order): void {
    const order = this.getOrderById(orderToUpdate.id);
    if (!order) throw new OrderNotFoundError();
    order.edit(orderToUpdate.description, orderToUpdate.label);
  }
}