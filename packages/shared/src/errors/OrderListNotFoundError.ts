import { NotFoundError } from ".";

export class OrderListNotFoundError extends NotFoundError {
    constructor(message: string = "OrderList not found") {
      super(message);
      this.name = 'OrderListNotFoundError';
    }
  }