import { io, Socket } from 'socket.io-client';
import AdminHandler from './socket/AdminHandler';
import { useConfigStore } from '@/stores/config-store';
import { ConnectionState } from '@/types';

class SocketClient {
  private static instance: SocketClient;
  private socket: Socket | undefined;
  public connectionState: ConnectionState;
  private constructor() {
    this.connectionState = 'offline';
  }

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }

    return SocketClient.instance;
  }

  public connect(): void {
    const configStore = useConfigStore();
    this.socket = io(configStore.integrationUrl, configStore.socketConfiguration);
    this.connectionStateHandlers();
    new AdminHandler(this.socket);
  }

  public disconnect(): void {
    this.socket?.disconnect();
  }

  private connectionStateHandlers() {
    const configStore = useConfigStore();
    this.socket?.on('connect', () => {
      this.socket?.emit('first-load');
      this.connectionState = 'connected';
      console.log('Connected to server!');
    }); 
    this.socket?.on('disconnect', () => {
      this.connectionState = 'offline';
      configStore.offlineMode = true;
      console.log('Disconnected from server!');
    });
    this.socket?.on('reconnect', () => {
      this.connectionState = 'connected';
      console.log('Reconnected to server!');
    });
    this.socket?.on('reconnecting', (attemptNumber) => {
      this.connectionState = 'connecting';
      console.log(`Attempting to reconnect (attempt ${attemptNumber})...`);
    });
    this.socket?.on('reconnect_failed', () => {
      this.connectionState = 'error';
      configStore.offlineMode = true;
      console.log('Failed to reconnect to server!');
    });
  }
}

export default SocketClient.getInstance();

