export const API_CONFIG = {
    BASE_URL: 'MEU SERVIDOR BACK END',
    SOCKET_URL: 'MEU SERVIDOR SEM O PREFIXO /API',
    TIMEOUT: 60000
}
export interface apiResponse <t = any> {
    success: boolean;
    data?: t;
    message?: string;
    error?: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string
}
export interface chatRoom {
    id: string;
    category: string;
    participants: string[];
    createdAt: string;
}
export interface message{
    id: string;
    roomid: string;
    userId: string;
    username: string;
    text: string;
    timestamp: string
}