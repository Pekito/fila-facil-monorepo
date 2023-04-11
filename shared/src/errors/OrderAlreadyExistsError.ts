export class OrderAlreadyExistsError extends Error {
    constructor(message: string = "Order with given id or given label already exists") {
      super(message);
      this.name = 'OrderAlreadyExistsError';
    }
  }