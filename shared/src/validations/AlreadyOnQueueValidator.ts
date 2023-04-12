import { Order, OrderQueue } from "@/entities";

export class AlreadyOnQueueValidator {
    public static validate(arg: Order | string, queue: OrderQueue): boolean {
        let candidate = {
            id: "",
            label: ""
        };
        if (typeof arg === 'string') {
             const order = queue.findOrderById(arg);
             candidate.id = order.id;
             candidate.label = order.label;
        }else {
            candidate.id = arg.id;
            candidate.label = arg.label;

        }

        const orders = queue.getOrderLists().flatMap(orderList => orderList.orders);
        console.log(orders, candidate);
        const orderAlreadyExists = orders.find(order => order.id === candidate.id || order.label === candidate.label);
        if(orderAlreadyExists) return false;
        else return true;
    }
}