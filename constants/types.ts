export interface User {
    id: string;
    name: string;
    email: string;
}

export interface ChatMessage {
    id: string;
    text: string;
    isUser: boolean;
    // 'me' | 'partner' | 'system'
    // Usado pelo ChatMessage component para decidir lado da bolha
    sender: 'me' | 'partner' | 'system';
    timestamp: Date;
    UserName: string;
}

export interface ChatCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}
