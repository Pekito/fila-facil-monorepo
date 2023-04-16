import { OrderListDTO, OrderQueueDTO } from "../dtos";
import { OrderQueue } from "../entities";
import { OrderListMapper } from ".";

export class OrderQueueMapper {
    public static toDTO(orderQueue: OrderQueue): OrderQueueDTO {
      const orderListDTOs: OrderListDTO[] = orderQueue.getOrderLists().map(orderList => OrderListMapper.toDTO(orderList));
      return {
        orderLists: orderListDTOs,
      };
    }
  
    public static toInstance(orderQueueDTO: OrderQueueDTO): OrderQueue {
      
      const orderListInstances = orderQueueDTO.orderLists.map(orderListDTO => OrderListMapper.toInstance(orderListDTO));
      return new OrderQueue(orderListInstances);
    }
  }