import { OrderDTO } from "../dtos/";
import { Order } from "../entities";

export class OrderMapper {
    static toDTO(order: Order): OrderDTO {
      return {
        id: order.id,
        description: order.description,
        label: order.label,
      };
    }
  
    static toInstance(dto: OrderDTO): Order {
      return new Order(dto.id, dto.description, dto.label);
    }
  }