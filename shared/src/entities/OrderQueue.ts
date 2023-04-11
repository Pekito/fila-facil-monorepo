import { OrderAlreadyExistsError, OrderListNotFoundError, OrderNotFoundError } from '../errors/index';
import { Order, OrderList } from './index';

export class OrderQueue {
  private orderLists: OrderList[];

  constructor(orderLists: OrderList[]) {
    this.orderLists = orderLists;
  }

  public moveOrder(orderId: string, sourceListName: string, destinationListName: string): void {
    const sourceList = this.orderLists.find((orderList) => orderList.name === sourceListName);
    if (!sourceList) throw new OrderListNotFoundError('Source List not Found');

    const destinationList = this.orderLists.find((orderList) => orderList.name === destinationListName);
    if (!destinationList) throw new OrderListNotFoundError('Destination List was not found');

    const orderToMove = sourceList.getOrderById(orderId);
    if (!orderToMove) throw new OrderNotFoundError();
    
    sourceList.removeOrder(orderId);
    destinationList.addOrder(orderToMove);
  }

  public moveOrderTo(orderId: string, destinationListName: string): void {
    const destinationList = this.orderLists.find((orderList) => orderList.name === destinationListName);
    if (!destinationList) throw new OrderListNotFoundError('Destination List was not found');

    const sourceList = this.orderLists.find((orderList) => orderList.getOrderById(orderId));
    if (!sourceList) throw new OrderListNotFoundError('Order Not Found in any list');
    
    const orderToMove = sourceList.getOrderById(orderId);
    if (!orderToMove) throw new OrderNotFoundError();
    
    sourceList.removeOrder(orderId);
    destinationList.addOrder(orderToMove);
  }

  public getOrderLists(): OrderList[] {
    return this.orderLists;
  }
  public getOrderList(name: string): OrderList{
    const orderList = this.orderLists.find(orderList => orderList.name === name);
    if(!orderList) throw new OrderListNotFoundError();
    return orderList;
  }
  public updateList(name: string, list: Order[]) : void {
    const orderListIndex = this.orderLists.findIndex(orderList => orderList.name === name);
    if(orderListIndex === -1) throw new OrderListNotFoundError();
    const orderList = this.orderLists[orderListIndex];
    orderList.orders = list;
  }
  public addOrder(order: Order, listToAdd: string) {
    const orderAlreadyExists = this.orderLists.find(orderList => {
      return orderList.getOrderById(order.id) || orderList.getOrderByLabel(order.label);
    })
    if(orderAlreadyExists) throw new OrderAlreadyExistsError();

    const list = this.getOrderList(listToAdd);
    list.addOrder(order);

  }
  public removeOrder(orderId: string) {
    const sourceList = this.orderLists.find((orderList) => orderList.getOrderById(orderId));
    if (!sourceList) throw new OrderNotFoundError('Order Not Found in any list');
    const orderIndex = sourceList.orders.findIndex(order => order.id === orderId);
    sourceList.orders.splice(orderIndex, 1);
  }
}