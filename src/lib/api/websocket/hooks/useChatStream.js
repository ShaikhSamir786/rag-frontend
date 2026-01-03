import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';

export function useChatStream(sessionId) {
    const { socket } = useSocket();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket || !sessionId) return;

        socket.on(`chat:${sessionId}`, (message) => {
            setMessages((prev) => [...prev, message]);
        });
    }, [socket, sessionId]);

    return { messages };
}
