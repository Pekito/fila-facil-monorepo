import { OrderListNotFoundError, OrderNotFoundError } from '../errors';
import { OrderList } from './';

export class OrderQueue {
  private orderLists: OrderList[];

  constructor(orderLists: OrderList[]) {
    this.orderLists = orderLists;
  }

  public moveOrder(orderId: string, sourceListIndex: number, destinationListIndex: number): void {
    const sourceList = this.orderLists[sourceListIndex];
    const destinationList = this.orderLists[destinationListIndex];
    const orderToMove = sourceList.getOrderById(orderId);
    if (!orderToMove) throw new OrderNotFoundError();
    sourceList.removeOrder(orderId);
    destinationList.addOrder(orderToMove);
  }

  public moveOrderTo(orderId: string, destinationListIndex: number): void {
    const destinationList = this.orderLists[destinationListIndex];
    if (!destinationList) throw new OrderListNotFoundError('Destination List was not found');

    const sourceList = this.orderLists.find(orderList => orderList.getOrderById(orderId));
    if (!sourceList) throw new OrderListNotFoundError('Order Not Found in any list');
    
    const orderToMove = sourceList.getOrderById(orderId);
    if (!orderToMove) throw new OrderNotFoundError();
    
    sourceList.removeOrder(orderId);
    destinationList.addOrder(orderToMove);
  }

  public getOrderLists(): OrderList[] {
    return this.orderLists;
  }
}