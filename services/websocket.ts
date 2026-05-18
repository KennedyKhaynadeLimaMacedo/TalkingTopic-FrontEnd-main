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
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        return new Promise((resolve, reject) => {
            this.socket!.on('connect', () => {
                this.isConnected = true;
                console.log('✅ WebSocket connected:', this.socket?.id);

                if (token) {
                    this.socket!.emit('authenticate', { token });
                }
                resolve();
            });

            // Quando o servidor autenticar, salva o userId para uso no useChat
            this.socket!.on('authenticated', async (data: any) => {
                console.log('🔐 Authenticated userId:', data.userId || data.userID);
                const userId = data.userId || data.userID || data.id;
                if (userId) {
                    await AsyncStorage.setItem('userId', userId.toString());
                }
            });

            this.socket!.on('connect_error', (error) => {
                console.error('❌ Connection error:', error.message);
                reject(error);
            });

            this.socket!.on('auth_error', (error) => {
                console.error('❌ Auth error:', error);
                reject(error);
            });

            this.socket!.on('disconnect', (reason) => {
                this.isConnected = false;
                console.log('🔌 WebSocket disconnected:', reason);
            });

            this.socket!.on('reconnect', (attempt) => {
                console.log('🔄 Reconnected after', attempt, 'attempts');
                this.isConnected = true;
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

    // Alias para compatibilidade
    disconnected(): void {
        this.disconnect();
    }

    JoinRoom(roomId: string): void {
        console.log('🚪 Joining room:', roomId);
        this.socket?.emit('join-room', { roomId });
    }

    LeaveRoom(roomId: string): void {
        console.log('🚶 Leaving room:', roomId);
        this.socket?.emit('leave-room', { roomId });
    }

    sendMessage(roomId: string, message: string): void {
        this.socket?.emit('send-message', { roomId, message });
    }

    onMessage(callback: (data: any) => void): void {
        this.socket?.on('new-message', callback);
    }

    onUserJoined(callback: (data: any) => void): void {
        this.socket?.on('user-joined', callback);
    }

    onUserLeft(callback: (data: any) => void): void {
        this.socket?.on('user-left', callback);
    }

    onMatchFound(callback: (data: any) => void): void {
        this.socket?.on('match-found', callback);
    }

    findMatch(category: string): void {
        console.log('🔍 Finding match for:', category);
        this.socket?.emit('find-match', { category });
    }

    cancelMatch(): void {
        this.socket?.emit('cancel-match');
    }

    removeAllListeners(): void {
        this.socket?.removeAllListeners();
    }

    get connected(): boolean {
        return this.isConnected;
    }
}

export const wsService = new WebSocketService();
