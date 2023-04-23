import { OrderList } from '@fila-facil/shared/src/entities';
import { Socket } from 'socket.io-client';
import { useOrderQueueStore } from '@/stores/order-queue';
import { useConfigStore } from '@/stores/config-store';
import { OrderListDTO } from '@fila-facil/shared/src/dtos';
import { OrderListMapper } from '@fila-facil/shared/src/mappers';
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
        this.socket.on('current-queue', (orderLists: OrderListDTO[]) => {
            if (this.configStore.overwriteServerQueue) {
                this.socket.emit('overwrite-queue', this.orderQueueStore.orderLists);
                this.configStore.isFirstSession = false;
                this.configStore.overwriteServerQueue = false;
            }
            else {
                this.orderQueueStore.resetAllLists();
                orderLists.forEach(orderList => {
                    const orderListInstance = OrderListMapper.toInstance(orderList);
                    this.orderQueueStore.addOrderList(orderListInstance);
                });
            }
        });
        this.socket.on('order-list-updated', (orderList: OrderListDTO) => {
            const orderListInstance = OrderListMapper.toInstance(orderList);
            this.orderQueueStore.localUpdate(orderListInstance.name, orderListInstance.orders);
        })
    }
    private initWatchers() {
        this.orderQueueStore.$onAction(({ name, store, args, after }) => {
            after(() => {
                switch (name) {
                    case 'updateList':
                        this.socket.emit('update-order-list', { name: args[0], orders: args[1] });
                        break;
                    case 'addOrder':
                        const currentList: OrderList = this.orderQueueStore.getOrderListByName(args[1]);
                        const newOrder = currentList.getOrderByLabel(args[0].label);
                        this.socket.emit('add-order', newOrder, args[1]);
                        break;
                    case 'editOrder':
                        this.socket.emit('edit-order', args[0], args[1]);
                        break;
                    case 'removeOrder':
                        this.socket.emit('remove-order', args[0], args[1])
                        break;
                    case 'moveOrder': {
                        this.socket.emit('move-manually', {orderId: args[0], source: args[1], destination: args[2]});
                    }
                        break;
                    case 'clearList':
                        this.socket.emit('clear-list', args[0]);
                        break;
                    case 'notifyOrder':
                        this.socket.emit('notify-order', args[0], args[1]);
                        break;
                }
            })
        })
    }
}