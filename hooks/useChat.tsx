import { useCallback, useEffect, useState } from 'react';
import { ChatMessage } from '../constants/types';
import { localChat } from '../services/localChat';
import { censorMessage } from '../utils/censor';

export function useChat(category: string) {
    const [messages, setMessages]           = useState<ChatMessage[]>([]);
    const [isConnected, setIsConnected]     = useState(false);
    const [isMatching, setIsMatching]       = useState(false);
    const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
    const [partnerName, setPartnerName]     = useState<string>('');

    const addMsg = (msg: ChatMessage) =>
        setMessages(prev => [...prev, msg]);

    const addSystem = (text: string) =>
        addMsg({
            id: `sys_${Date.now()}`,
            text,
            isUser: false,
            sender: 'system',
            timestamp: new Date(),
            UserName: 'Sistema',
        });

    const handleMatchFound = useCallback((data: {
        roomId: string; partnerName: string; iAmInitiator: boolean;
    }) => {
        setCurrentRoomId(data.roomId);
        setIsMatching(false);
        setIsConnected(true);
        setMessages([]);
        setPartnerName(data.partnerName);
        addSystem(`✅ Parceiro encontrado! Conversando com ${data.partnerName}`);
    }, []);

    const handleMessage = useCallback((data: {
        id: string; text: string; senderId: string; senderName: string; timestamp: string;
    }) => {
        addMsg({
            id: data.id,
            // Censura a mensagem recebida do parceiro também
            text: censorMessage(data.text),
            isUser: false,
            sender: 'partner',
            timestamp: new Date(data.timestamp),
            UserName: data.senderName || 'Anônimo',
        });
    }, []);

    const handlePartnerLeft = useCallback(() => {
        setIsConnected(false);
        setCurrentRoomId(null);
        setPartnerName('');
        addSystem('⚠️ Seu parceiro saiu. Procurando novo match...');
        setIsMatching(true);
        setTimeout(() => localChat.joinQueue(category), 1500);
    }, [category]);

    useEffect(() => {
        localChat.onMatchFound(handleMatchFound);
        localChat.onMessage(handleMessage);
        localChat.onPartnerLeft(handlePartnerLeft);
        setIsMatching(true);
        localChat.joinQueue(category);
        return () => {
            localChat.leaveAll();
            localChat.removeAllListeners();
        };
    }, [category]);

    const sendMessage = (text: string) => {
        if (!text.trim() || !currentRoomId) return;
        // Censura antes de exibir e enviar
        const clean = censorMessage(text.trim());
        addMsg({
            id: `local_${Date.now()}`,
            text: clean,
            isUser: true,
            sender: 'me',
            timestamp: new Date(),
            UserName: 'Você',
        });
        localChat.sendMessage(clean);
    };

    const findNewPartner = () => {
        localChat.leaveAll();
        setIsConnected(false);
        setIsMatching(true);
        setMessages([]);
        setCurrentRoomId(null);
        setPartnerName('');
        setTimeout(() => localChat.joinQueue(category), 300);
    };

    return { messages, isConnected, isMatching, partnerName, sendMessage, findNewPartner, myName: localChat.userName };
}
