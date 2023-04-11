import { Order } from '../entities/index';
import { OrderList } from '../entities/index';
import { OrderNotFoundError } from '../errors/index';

describe('OrderList', () => {
  let order1: Order;
  let order2: Order;
  let orderList: OrderList;

  beforeEach(() => {
    order1 = new Order(null, 'Order 1', 'Label 1');
    order2 = new Order(null, 'Order 2', 'Label 2');
    orderList = new OrderList('orderList',[order1, order2]);
  });

  it('Should return the list of orders', () => {
    expect(orderList.getOrders()).toEqual([order1, order2]);
  });

  it('Should add an order to the end of the list', () => {
    const order3 = new Order(null, 'Order 3', 'Label 3');
    orderList.addOrder(order3);
    expect(orderList.getOrders()).toEqual([order1, order2, order3]);
  });

  it('Should add an order to a specific index in the list', () => {
    const order3 = new Order(null, 'Order 3', 'Label 3');
    orderList.addOrder(order3, 1);
    expect(orderList.getOrders()).toEqual([order1, order3, order2]);
  });

  it('Should remove an order from the list', () => {
    orderList.removeOrder(order1.id);
    expect(orderList.getOrders()).toEqual([order2]);
  });

  it('Should get an order by id', () => {
    const result = orderList.getOrderById(order2.id);
    expect(result).toEqual(order2);
  });

  it('Should get an order by label', () => {
    const result = orderList.getOrderByLabel(order2.label);
    expect(result).toEqual(order2);
  });

  it('Should edit an existing order', () => {
    const updatedOrder = new Order(order2.id, 'New Description', 'New Label');
    orderList.editOrder(updatedOrder);
    const result = orderList.getOrderById(order2.id);
    expect(result).toEqual(updatedOrder);
  });

  it('Should throw an OrderNotFound error if Order is not present on the list', () => {
    expect(() => {
      const updatedOrder = new Order(null, 'New Description', 'New Label');
      orderList.editOrder(updatedOrder);
    }).toThrow(OrderNotFoundError);
  });
});