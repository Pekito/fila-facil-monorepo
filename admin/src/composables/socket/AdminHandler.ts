import { OrderList } from "@fila-facil/shared/src/entities";
import { Socket } from "socket.io-client";
import { useOrderQueueStore } from "@/stores/order-queue";
import { useConfigStore } from "@/stores/config-store";
export default class AdminHandler {
    private socket: Socket;
    private orderQueueStore; 
    private configStore;
    constructor(socket: Socket) {
        this.socket = socket;
        this.initializeSocketEvents();
        this.orderQueueStore = useOrderQueueStore();
        this.configStore = useConfigStore();
        this.initWatchers();
    }
    private initializeSocketEvents() {
        this.socket.on('current-queue', (orderLists: OrderList[]) => {
            if(this.configStore.overwriteServerQueue) {
                this.socket.emit('overwrite-queue', this.orderQueueStore.orderLists)
            }
            else {
                this.orderQueueStore.resetAllLists();
                orderLists.forEach(orderList => this.orderQueueStore.addOrderList(orderList));
            }
        });
        this.socket.on('update-order-list', (orderList: OrderList) => {
            this.orderQueueStore.updateList(orderList.name, orderList.orders);
        })
    }
    private initWatchers() {
        this.orderQueueStore.$onAction(({name, store, args, after}) => {
            switch(name) {
                case "updateList":
                    this.socket.emit('update-order-list', args[0], args[1]);
                break;
                case "addOrder":
                    this.socket.emit('add-order', args[0], args[1]);
                break;
                case "editOrder":
                    this.socket.emit('edit-order', args[0], args[1]);
                break;
                case "removeOrder":
                    this.socket.emit('remove-order', args[0], args[1])
                case "clearList":
                    this.socket.emit('clear-list', args[0]);
                break;
            }
        })
    }
}