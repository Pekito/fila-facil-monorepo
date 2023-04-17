export class OrderListAlreadyExistsError extends Error {
    constructor(message: string = "OrderList with given name already exists") {
      super(message);
      this.name = 'OrderListAlreadyExistsError';
    }
  }