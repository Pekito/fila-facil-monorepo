import { Order, OrderQueue } from "../entities";

export class AlreadyOnQueueValidator {
    public static validate(candidate: Order , queue: OrderQueue): boolean {
        const orders = queue.getOrderLists().flatMap(orderList => orderList.orders);
        const orderAlreadyExists = orders.find(order => {
            return order.label === candidate.label && order.id !== candidate.id
        });
        if(orderAlreadyExists) return false;
        else return true;
    }
}