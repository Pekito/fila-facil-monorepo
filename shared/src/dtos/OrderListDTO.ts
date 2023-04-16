import { OrderDTO } from ".";

export type OrderListDTO = {
    name: string;
    orders: OrderDTO[];
    finish?: boolean;
    notifies?: boolean;
    client?: boolean;
  };