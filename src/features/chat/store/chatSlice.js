import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sessions: [],
    currentSessionId: null,
    messages: {},
    streamingMessageId: null,
    streamingContent: '',
    isLoading: false,
    isStreaming: false,
    error: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSessions: (state, action) => {
            state.sessions = action.payload;
        },
        addSession: (state, action) => {
            state.sessions.unshift(action.payload);
        },
        updateSession: (state, action) => {
            const index = state.sessions.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.sessions[index] = { ...state.sessions[index], ...action.payload };
            }
        },
        removeSession: (state, action) => {
            state.sessions = state.sessions.filter(s => s.id !== action.payload);
            if (state.currentSessionId === action.payload) {
                state.currentSessionId = null;
                delete state.messages[action.payload];
            }
        },
        setCurrentSession: (state, action) => {
            state.currentSessionId = action.payload;
        },
        setMessages: (state, action) => {
            const { sessionId, messages } = action.payload;
            state.messages[sessionId] = messages;
        },
        addMessage: (state, action) => {
            const { sessionId, message } = action.payload;
            if (!state.messages[sessionId]) {
                state.messages[sessionId] = [];
            }
            state.messages[sessionId].push(message);
        },
        updateMessage: (state, action) => {
            const { sessionId, messageId, updates } = action.payload;
            const messages = state.messages[sessionId] || [];
            const index = messages.findIndex(m => m.id === messageId);
            if (index !== -1) {
                messages[index] = { ...messages[index], ...updates };
            }
        },
        removeMessage: (state, action) => {
            const { sessionId, messageId } = action.payload;
            const messages = state.messages[sessionId] || [];
            state.messages[sessionId] = messages.filter(m => m.id !== messageId);
        },
        startStreaming: (state, action) => {
            state.isStreaming = true;
            state.streamingMessageId = action.payload.messageId;
            state.streamingContent = '';
        },
        appendStreamChunk: (state, action) => {
            state.streamingContent += action.payload;
        },
        completeStreaming: (state, action) => {
            state.isStreaming = false;
            if (state.streamingMessageId && action.payload) {
                const { sessionId, message } = action.payload;
                if (!state.messages[sessionId]) {
                    state.messages[sessionId] = [];
                }
                state.messages[sessionId].push(message);
            }
            state.streamingMessageId = null;
            state.streamingContent = '';
        },
        stopStreaming: (state) => {
            state.isStreaming = false;
            state.streamingMessageId = null;
            state.streamingContent = '';
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearMessages: (state, action) => {
            const sessionId = action.payload;
            state.messages[sessionId] = [];
        },
    },
});

export const {
    setSessions,
    addSession,
    updateSession,
    removeSession,
    setCurrentSession,
    setMessages,
    addMessage,
    updateMessage,
    removeMessage,
    startStreaming,
    appendStreamChunk,
    completeStreaming,
    stopStreaming,
    setLoading,
    setError,
    clearError,
    clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
