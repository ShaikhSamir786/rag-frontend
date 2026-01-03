class SocketClient {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
    }

    connect(url, token) {
        // Stub implementation
        console.log('Connecting to WebSocket:', url);
        // this.socket = new WebSocket(url);
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    emit(event, data) {
        console.log('Emit:', event, data);
    }
}

export const socketClient = new SocketClient();
