'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { socketClient } from '../client/socket.client';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Initialize socket connection
        return () => {
            socketClient.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socketClient, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    return useContext(SocketContext);
}
