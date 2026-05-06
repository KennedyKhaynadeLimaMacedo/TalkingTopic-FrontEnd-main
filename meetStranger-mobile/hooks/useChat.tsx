import { useCallback, useEffect, useState } from 'react';
import { ChatMessage } from '../constants/types';
import { wsService } from '../services/websocket';
 
export function useChat(category: string) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
 
    const [isConnected, setIsConnected] = useState(false);
 
    const [isMatching, setIsMatching] = useState(false);
 
    const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
 
    const [partnerName, setPartnerName] = useState<string>('Procurando...');
   
    const handleNewMessage = useCallback((data: any) => {
      console.log('New message received:', data);
     
      const newMessage: ChatMessage = {
        id: data.id,
        text: data.message,
        isUser: false,
        timestamp: new Date(data.timestamp),
        UserName: data.username || 'Desconhecido'
      };
      setMessages(prev => [...prev, newMessage]);
    }, []);
 
    const handleMatchFound = useCallback((data: any) => {
      console.log('Match found:', data);
      setCurrentRoomId(data.roomId);
      setIsMatching(false);
      setIsConnected(true);
      setMessages([]);
      setPartnerName(data.partner?.username || 'Usuário');
      wsService.JoinRoom(data.roomId);
    }, []);
 
    const handleUserLeft = useCallback(() => {
      console.log('User left');
      setIsConnected(false);
      setCurrentRoomId(null);
      setPartnerName('Procurando...');
      setIsMatching(true);
 
      setTimeout(() => {
        wsService.findMatch(category);
      }, 1000);
    }, [category]);
   
    const handleQueueStatus = useCallback((data: any) => {
      console.log('Queue status:', data);
      setIsMatching(true);
    }, []);
 
    useEffect(() => {
      const initializeWebSocket = async () => { // 👈 CORREÇÃO AQUI
        try {
          if (!wsService.connected) {
            await wsService.connect();
          }
          wsService.onMessage(handleNewMessage);
          wsService.onMatchingFound(handleMatchFound);
          wsService.onUserLeft(handleUserLeft);
          wsService.socket?.on('queueStatus', handleQueueStatus);
          wsService.socket?.on('partner_left', handleUserLeft);
          wsService.socket?.on('partner_disconnected', handleUserLeft);
          console.log('🔍 Starting automatic match search for', category);
          wsService.findMatch(category);
          setIsMatching(true);
 
        } catch (error) {
          console.error('WebSocket connection failed', error);
        }
      };
 
      initializeWebSocket();
 
      return () => {
        wsService.removeAllListeners();
      };
    }, [category, handleNewMessage, handleMatchFound, handleUserLeft, handleQueueStatus]);

    const sendMessage = async (text: string) => {
      if (!text.trim() || !currentRoomId) return;

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: text.trim(),
        isUser: true,
        timestamp: new Date(),
        UserName: 'Você'
      };

      setMessages(prev => [...prev, newMessage]);

      try {
        wsService.sendMessage(currentRoomId, text.trim());
      } catch (error) {
        console.error('Error sending message', error);
      }
    };

    const findNewPartner = async () => {
      if (currentRoomId) {
        wsService.LeavenRoom(currentRoomId);
      }
 
      setIsConnected(false);
      setIsMatching(true);
      setMessages([]);
      setCurrentRoomId(null);
      setPartnerName('Procurando...');
      
      try {
        wsService.findMatch(category);
      } catch (error) {
        console.error('Error finding match', error);
        setIsMatching(false);
      }
    };
    useEffect(() => {
        return () => {
            if (currentRoomId) {
                wsService.LeavenRoom(currentRoomId)
            }
        };
    }, [currentRoomId]);
    return {
        messages,
        isConnected,
        isMatching,
        partnerName,
        sendMessage,
        findNewPartner
    };
}