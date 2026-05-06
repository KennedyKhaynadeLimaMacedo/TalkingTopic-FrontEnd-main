import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from './config';
import { io, Socket } from 'socket.io-client';

class WebSocketService {
    public socket: Socket | null = null;
    private isConnected = false;

    async connect(): Promise<void> {
        const token = await AsyncStorage.getItem('authToken');

        this.socket = io(API_CONFIG.SOCKET_URL, {
            auth: { token },
            transports: ['websocket']
        });

        return new Promise((resolve, reject) => {
            this.socket!.on('connect', () => {
                this.isConnected = true;
                console.log('webSocket connected');

                if (token) {
                    this.socket!.emit('authenticate', { token });
                }
                resolve();
            });
            this.socket!.on('authenticated', (data) => {
                console.log(data.userID);
            });
            this.socket!.on('connect_error', (error) => {
                reject(error);
            });
            this.socket!.on('auth_error', (error) => {
                reject(error);
            });
            this.socket!.on('disconnect', () => {
                this.isConnected = false;
            });
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }

    JoinRoom(roomId: string): void { this.socket?.emit('join-room', { roomId }); }

    LeaveRoom(roomId: string): void { this.socket?.emit('leave-room', { roomId }); }

    sendMessage(roomId: string, message: string): void { this.socket?.emit('send-message', { roomId, message }); }

    onMessage(callback: (data: any) => void): void { this.socket?.on('new-message', callback); }

    onUserJoined(callback: (data: any) => void): void { this.socket?.on('user-joined', callback); }

    onUserLeft(callback: (data: any) => void): void { this.socket?.on('user-left', callback); }

    onMatchFound(callback: (data: any) => void): void { this.socket?.on('match-found', callback); }

    findMatch(category: string): void { this.socket?.emit('find-match', { category }); }

    cancelMatch(): void { this.socket?.emit('cancel-match'); }

    removeAllListeners(): void { this.socket?.removeAllListeners(); }

    get connected(): boolean { return this.isConnected; }
}

export const wsService = new WebSocketService();
