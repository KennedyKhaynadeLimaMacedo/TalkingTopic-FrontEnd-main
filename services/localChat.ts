/**
 * LocalChatService — chat entre 2 abas do navegador via BroadcastChannel.
 * Sem backend, sem WebSocket. Funciona no Expo Web.
 *
 * Como funciona:
 *  1. Ao entrar na sala, o usuário emite 'join' no canal da categoria.
 *  2. Se já houver alguém esperando, ambos recebem 'match-found' com um roomId compartilhado.
 *  3. Mensagens são trocadas via BroadcastChannel do roomId.
 *  4. Ao sair, emite 'leave' para o parceiro saber.
 */

type MatchFoundPayload = {
    roomId: string;
    partnerName: string;
    iAmInitiator: boolean;
};

type Listener<T = any> = (data: T) => void;

class LocalChatService {
    private myId: string;
    private myName: string;
    private queueChannel: BroadcastChannel | null = null;
    private roomChannel: BroadcastChannel | null = null;
    private currentRoomId: string | null = null;
    private currentCategory: string | null = null;

    private onMatchFoundCb: Listener<MatchFoundPayload> | null = null;
    private onMessageCb: Listener<{ id: string; text: string; senderId: string; senderName: string; timestamp: string }> | null = null;
    private onPartnerLeftCb: Listener | null = null;

    // Nomes anônimos aleatórios para deixar mais divertido
    private static names = [
        'Visitante Neon', 'Anônimo Azul', 'Usuário Oculto', 'Intruso Verde',
        'Fantasma Digital', 'Alien Curioso', 'Robô Simpático', 'Ninja da Net',
        'Sombra Online', 'Espírito Livre',
    ];

    constructor() {
        this.myId = `user_${Math.random().toString(36).slice(2, 9)}`;
        this.myName = LocalChatService.names[Math.floor(Math.random() * LocalChatService.names.length)];
    }

    get userId() { return this.myId; }
    get userName() { return this.myName; }

    // ── Entra na fila de matching para uma categoria ──────────────
    joinQueue(category: string) {
        this.leaveAll(); // limpa conexões anteriores
        this.currentCategory = category;

        const channelName = `talkingtopic_queue_${category.toLowerCase()}`;
        this.queueChannel = new BroadcastChannel(channelName);

        this.queueChannel.onmessage = (event) => {
            const { type, from, fromName, roomId } = event.data;

            // Outro usuário entrou na fila — cria o match
            if (type === 'join' && from !== this.myId) {
                const sharedRoomId = roomId || `room_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

                // Avisa o outro que o match foi encontrado
                this.queueChannel?.postMessage({
                    type: 'match-found',
                    roomId: sharedRoomId,
                    initiatorId: this.myId,
                    initiatorName: this.myName,
                    targetId: from,
                });

                // Conecta na sala
                this._connectRoom(sharedRoomId, fromName || 'Anônimo', true);
            }

            // Recebe confirmação de match do iniciador
            if (type === 'match-found' && event.data.targetId === this.myId) {
                this._connectRoom(event.data.roomId, event.data.initiatorName || 'Anônimo', false);
            }
        };

        // Anuncia entrada na fila
        this.queueChannel.postMessage({
            type: 'join',
            from: this.myId,
            fromName: this.myName,
            category,
        });
    }

    // ── Conecta na sala após match ────────────────────────────────
    private _connectRoom(roomId: string, partnerName: string, iAmInitiator: boolean) {
        this.currentRoomId = roomId;
        this.queueChannel?.close();
        this.queueChannel = null;

        this.roomChannel = new BroadcastChannel(`talkingtopic_room_${roomId}`);

        this.roomChannel.onmessage = (event) => {
            const { type, senderId, senderName, text, timestamp, id } = event.data;

            if (type === 'message' && senderId !== this.myId) {
                this.onMessageCb?.({ id, text, senderId, senderName, timestamp });
            }

            if (type === 'leave' && senderId !== this.myId) {
                this.onPartnerLeftCb?.({});
            }
        };

        // Notifica o hook
        this.onMatchFoundCb?.({ roomId, partnerName, iAmInitiator });
    }

    // ── Envia mensagem na sala ────────────────────────────────────
    sendMessage(text: string) {
        if (!this.roomChannel || !this.currentRoomId) return;

        this.roomChannel.postMessage({
            type: 'message',
            id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
            senderId: this.myId,
            senderName: this.myName,
            text,
            timestamp: new Date().toISOString(),
        });
    }

    // ── Sai da sala ───────────────────────────────────────────────
    leaveRoom() {
        if (this.roomChannel) {
            this.roomChannel.postMessage({
                type: 'leave',
                senderId: this.myId,
            });
            this.roomChannel.close();
            this.roomChannel = null;
        }
        this.currentRoomId = null;
    }

    leaveAll() {
        this.leaveRoom();
        this.queueChannel?.close();
        this.queueChannel = null;
    }

    // ── Registra callbacks ────────────────────────────────────────
    onMatchFound(cb: Listener<MatchFoundPayload>) { this.onMatchFoundCb = cb; }
    onMessage(cb: Listener) { this.onMessageCb = cb; }
    onPartnerLeft(cb: Listener) { this.onPartnerLeftCb = cb; }

    removeAllListeners() {
        this.onMatchFoundCb = null;
        this.onMessageCb = null;
        this.onPartnerLeftCb = null;
    }
}

export const localChat = new LocalChatService();
