import { Order, OrderList, OrderQueue } from "../entities/index";
import { OrderListNotFoundError, OrderNotFoundError } from "../errors/index";

describe('OrderQueue', () => {
  let order1: Order;
  let order2: Order;
  let order3: Order;
  let orderList1: OrderList;
  let orderList2: OrderList;
  let orderQueue: OrderQueue;

  beforeEach(() => {
    order1 = new Order(null, 'Order 1', 'Label 1');
    order2 = new Order(null, 'Order 2', 'Label 2');
    order3 = new Order(null, 'Order 3', 'Label 3');
    orderList1 = new OrderList('list-1', [order1, order2]);
    orderList2 = new OrderList('list-2', [order3]);
    orderQueue = new OrderQueue([orderList1, orderList2]);
  });

  describe('moveOrder', () => {
    it('Should move an order from one list to another', () => {

      orderQueue.moveOrder(order1.id, orderList1.name, orderList2.name);

      expect(orderList1.getOrders()).toEqual([order2]);
      expect(orderList2.getOrders()).toEqual([order3, order1]);
    });

    it('Should not move an order if it is not found in the source list', () => {
      expect(() => {
        orderQueue.moveOrder('non-existent-order-id', orderList2.name, orderList1.name);
      }).toThrow(OrderNotFoundError);
    });

    it('Should not move an order if the source or destination lists are not found', () => {

      expect(() => {
        orderQueue.moveOrder(order1.id, 'undefined-list', orderList1.name);
      }).toThrow();
    });
  });

  describe('moveOrderTo', () => {
    it('Should move an order to a specific list', () => {

      orderQueue.moveOrderTo(order3.id, orderList1.name);

      expect(orderList1.getOrders()).toEqual([order1, order2, order3]);
      expect(orderList2.getOrders()).toEqual([]);
    });

    it('Should not move an order if it is not found in any list', () => {
      expect(() => {
        orderQueue.moveOrderTo('non-existent-order-id', orderList1.name);
      }).toThrow(OrderListNotFoundError);
    });

    it('Should not move an order if the destination list is not found', () => {
      expect(() => {
        orderQueue.moveOrderTo(order1.id, 'undefined-list');
      }).toThrow(OrderListNotFoundError);
    });
  });

  describe('getOrderLists', () => {
    it('Should return the order lists in the queue', () => {
      const orderLists = orderQueue.getOrderLists();

      expect(orderLists).toEqual([orderList1, orderList2]);
    });
  });

  describe('updateList', () => {
    it('Should update the list with the given name', () => {
      const newOrder = new Order(null, 'New Order', 'New Label');

      const orders = [newOrder];

      orderQueue.updateList('list-1', orders);
      expect(orderList1.orders).toEqual(orders);
    });

    it('Should throw an OrderListNotFoundError if the list with the given name is not found', () => {
      const newName = 'Non-existent List';
      const newOrder = new Order(null, 'New Order', 'New Label');
      const orders = [newOrder];

      expect(() => orderQueue.updateList(newName, orders)).toThrow(OrderListNotFoundError);
    });
  });
  describe('removeOrder', () => {
    it('Should remove an order from the queue', () => {
      orderQueue.removeOrder(order1.id);
      expect(orderList1.orders).toEqual([order2]);
    })
    it('Should throw an OrderNotFoundError if the order with the given id is not found', () => {
      expect(() => orderQueue.removeOrder('corinthians')).toThrow(OrderNotFoundError);
    })
  })
});