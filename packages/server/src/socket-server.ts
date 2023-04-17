import { Server } from 'socket.io';
import { OrderList, OrderQueue } from '@fila-facil/shared/src/entities';
import { AdminHandler, ClientHandler } from './handlers/';

export default class SocketServer {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    this.initializeSocketEvents();
  }

  private initializeSocketEvents() {
    const recebidosList = new OrderList('recebidos');
    const emAndamentoList = new OrderList('em-andamento', undefined, false, false, true);
    const prontosList = new OrderList('prontos',undefined, false, true,true);
    const finishedList = new OrderList('finished',undefined, true, false, false);
    const orderQueue = new OrderQueue([recebidosList, emAndamentoList, prontosList, finishedList]);
    const adminNamespace = this.io.of('/admin');
    const clientNamespace = this.io.of('/client');
    new AdminHandler(adminNamespace, orderQueue);
    new ClientHandler(clientNamespace, orderQueue);
  }
}