import { Order, OrderList, OrderQueue } from "../entities";
import { NotFoundError, OrderListNotFoundError, OrderNotFoundError } from "../errors";

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
    orderList1 = new OrderList([order1, order2]);
    orderList2 = new OrderList([order3]);
    orderQueue = new OrderQueue([orderList1, orderList2]);
  });

  describe('moveOrder', () => {
    it('Should move an order from one list to another', () => {
      const sourceListIndex = 0;
      const destinationListIndex = 1;

      orderQueue.moveOrder(order1.id, sourceListIndex, destinationListIndex);

      expect(orderList1.getOrders()).toEqual([order2]);
      expect(orderList2.getOrders()).toEqual([order3, order1]);
    });

    it('Should not move an order if it is not found in the source list', () => {
      const sourceListIndex = 1;
      const destinationListIndex = 0;

      expect(() => {
        orderQueue.moveOrder('non-existent-order-id', sourceListIndex, destinationListIndex);
      }).toThrow(OrderNotFoundError);
    });

    it('Should not move an order if the source or destination lists are not found', () => {
      const sourceListIndex = 2;
      const destinationListIndex = 0;

      expect(() => {
        orderQueue.moveOrder(order1.id, sourceListIndex, destinationListIndex);
      }).toThrow();
    });
  });

  describe('moveOrderTo', () => {
    it('Should move an order to a specific list', () => {
      const destinationListIndex = 0;

      orderQueue.moveOrderTo(order3.id, destinationListIndex);

      expect(orderList1.getOrders()).toEqual([order1, order2, order3]);
      expect(orderList2.getOrders()).toEqual([]);
    });

    it('Should not move an order if it is not found in any list', () => {
      expect(() => {
        orderQueue.moveOrderTo('non-existent-order-id', 0);
      }).toThrow(OrderListNotFoundError);
    });

    it('Should not move an order if the destination list is not found', () => {
      expect(() => {
        orderQueue.moveOrderTo(order1.id, 2);
      }).toThrow(OrderListNotFoundError);
    });
  });

  describe('getOrderLists', () => {
    it('Should return the order lists in the queue', () => {
      const orderLists = orderQueue.getOrderLists();

      expect(orderLists).toEqual([orderList1, orderList2]);
    });
  });
});