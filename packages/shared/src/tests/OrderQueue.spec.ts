import { Order, OrderList, OrderQueue } from "../entities/index";
import { OrderAlreadyExistsError, OrderListAlreadyExistsError, OrderListNotFoundError, OrderNotFoundError } from "../errors/index";

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
      orderQueue.removeOrder(order1.id, orderList1.name);
      expect(orderList1.orders).toEqual([order2]);
    })
    it('Should throw an OrderListNotFoundError if the list name is not found', () => {
      expect(() => orderQueue.removeOrder('whatever', 'it takes' )).toThrow(OrderListNotFoundError);
    })
    it('Should throw an OrderNotFoundError if the order with the given id is not found', () => {
      expect(() => orderQueue.removeOrder('corinthians', orderList1.name)).toThrow(OrderNotFoundError);
    })
  })
  describe('addOrder', () => {
    it('Should add an Order to a list', () => {
      const newOrder = new Order(null, 'New Order', 'New Label');
      orderQueue.addOrder(newOrder, orderList1.name);
      expect(orderList1.orders).toEqual([order1, order2, newOrder]);
    });
    it('Should NOT throw an OrderAlreadyExistsError if id is already presented but label is updated to a new one', () => {
      const newOrder = new Order(order1.id, 'New Order', 'New Label');
      expect(() => orderQueue.addOrder(newOrder, orderList1.name)).not.toThrow(OrderAlreadyExistsError);
    });
    it('Should throw an OrderAlreadyExistsError if an order already has a label', () => {
      const newOrder = new Order(order1.id, 'New Order', order2.label);
      expect(() => orderQueue.addOrder(newOrder, orderList1.name)).toThrow(OrderAlreadyExistsError);
    });
    it('Should throw an OrderAlreadyExistsError if label is already presented', () => {
      const newOrder = new Order(null, 'New Order', order1.label);
      expect(() => orderQueue.addOrder(newOrder, orderList1.name)).toThrow(OrderAlreadyExistsError);
    });
  })
  describe('clearList', () => {
    it('Should clear the list', () => {
      orderQueue.clearList(orderList1.name);
      expect(orderList1.orders).toEqual([]);
    });
    it('Should throw an error if list name is not found', () => {
      expect(() => orderQueue.clearList('Corinthians')).toThrow(OrderListNotFoundError)
    });
  })
  describe('findOrderById', () => {
    it('Should return the order with the given ID', () => {
      const result = orderQueue.findOrderById(order1.id);
      expect(result).toEqual(order1);
    });
  
    it('Should throw an OrderNotFoundError if the order is not found', () => {
      expect(() => orderQueue.findOrderById('Corinthians')).toThrow(OrderNotFoundError);
    });
  })
  describe('editOrder', () => {
    it('Should edit an order', () => {
      const newOrder = new Order(order1.id, 'New Order', 'New Label');
      orderQueue.editOrder(newOrder, orderList1.name);
      expect(order1).toEqual(newOrder);
    });
    it('Should NOT throw an OrderAlreadyExistsError if id is already presented but label is updated to a new one', () => {
      const newOrder = new Order(order1.id, 'New Order', 'New Label');
      expect(() => orderQueue.editOrder(newOrder, orderList1.name)).not.toThrow(OrderAlreadyExistsError);
    });
    it('Should throw an OrderAlreadyExistsError if an order already has a label', () => {
      const newOrder = new Order(order1.id, 'New Order', order2.label);
      expect(() => orderQueue.editOrder(newOrder, orderList1.name)).toThrow(OrderAlreadyExistsError);
    });
    it('Should throw an OrderAlreadyExistsError if label is already presented', () => {
      const newOrder = new Order(null, 'New Order', order1.label);
      expect(() => orderQueue.editOrder(newOrder, orderList1.name)).toThrow(OrderAlreadyExistsError);
    });
  })
  describe('addOrderList', () => {
    it('Should add an OrderList to the Queue', () => {
      const newOrderList = new OrderList("new-list");
      orderQueue.addOrderList(newOrderList);
      expect(orderQueue.getOrderLists()).toEqual([orderList1,orderList2,newOrderList])
    })
    it('Should throw an OrderListAlreadyExists error if name is already presented', () => {
      expect(() => {
        const newOrderList = new OrderList("list-1");
        orderQueue.addOrderList(newOrderList);
      }).toThrow(OrderListAlreadyExistsError);
    })
  })
  describe('deleteList', () => {
    it('Should delete a list', () => {
      const list = "list-1";
      orderQueue.deleteList(list);
      expect(orderQueue.getOrderLists()).toEqual([orderList2]);
    })
    it('Should throw a OrderListNotFoundError if given name is not found', () => {
      expect(() => orderQueue.deleteList("Corinthians")).toThrow(OrderListNotFoundError);
    })
  })
});