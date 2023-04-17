import { NotFoundError } from ".";

export class OrderNotFoundError extends NotFoundError {
    constructor(message: string = "Order not found") {
      super(message);
      this.name = 'OrderNotFoundError';
    }
  }