import { OrderListDTO } from "../dtos";
import { OrderList } from "../entities";
import { OrderMapper } from "./OrderMapper";

export class OrderListMapper {
    static toDTO(orderList: OrderList): OrderListDTO {
      return {
        name: orderList.name,
        orders: orderList.orders.map((order) => OrderMapper.toDTO(order)),
        finish: orderList.finish,
        notifies: orderList.notifies,
        client: orderList.client,
      };
    }
  
    static toInstance(dto: OrderListDTO): OrderList {
      const orders = dto.orders.map((orderDTO) => OrderMapper.toInstance(orderDTO));
      return new OrderList(dto.name, orders,dto.finish,dto.notifies,dto.client);
    }
  }