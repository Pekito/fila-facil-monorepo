import { useOrderQueueStore } from "@/stores/order-queue-store";
import { OrderDTO, OrderListDTO } from "@fila-facil/shared/src/dtos";
import { OrderListMapper, OrderMapper } from "@fila-facil/shared/src/mappers";
import { Socket } from "socket.io-client";
export default class ClientHandler {
    private socket: Socket;
    private orderQueueStore;
    constructor(socket: Socket) {
        this.socket = socket;
        this.orderQueueStore = useOrderQueueStore();
        this.initializeSocketEvents();
    }
    private initializeSocketEvents() {
        this.socket.on('first-load', (orderLists: OrderListDTO[]) => {
            orderLists.forEach(orderList => {
                const orderListInstance = OrderListMapper.toInstance(orderList);
                this.orderQueueStore.updateList(orderListInstance.name, orderListInstance.orders);
            })
        });
        this.socket.on('order-list-updated', (orderList: OrderListDTO) => {
            console.log('atualizou', orderList);
            const instance = OrderListMapper.toInstance(orderList);
            this.orderQueueStore.updateList(instance.name, instance.orders);
        })
    }
}