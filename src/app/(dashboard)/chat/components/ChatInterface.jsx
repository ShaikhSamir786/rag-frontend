'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { chatApi } from '@/features/chat/api/chatApi';
import { sessionApi } from '@/features/chat/api/sessionApi';
import {
    setMessages,
    addMessage,
    startStreaming,
    appendStreamChunk,
    completeStreaming,
    stopStreaming,
    setLoading,
    setError,
} from '@/features/chat/store/chatSlice';
import { toast } from 'react-hot-toast';

export function ChatInterface({ sessionId }) {
    const dispatch = useDispatch();
    const { messages, streamingContent, isStreaming, isLoading } = useSelector((state) => ({
        messages: state.chat.messages[sessionId] || [],
        streamingContent: state.chat.streamingContent,
        isStreaming: state.chat.isStreaming,
        isLoading: state.chat.isLoading,
    }));

    useEffect(() => {
        if (sessionId) {
            loadMessages();
        }
    }, [sessionId]);

    const loadMessages = async () => {
        if (!sessionId) return;

        try {
            dispatch(setLoading(true));
            const response = await chatApi.getMessages(sessionId);
            dispatch(setMessages({ sessionId, messages: response || [] }));
        } catch (error) {
            dispatch(setError(error.message));
            toast.error('Failed to load messages');
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSendMessage = async (content) => {
        if (!content.trim()) return;

        let currentSessionId = sessionId;

        // Create session if none exists
        if (!currentSessionId) {
            try {
                const session = await sessionApi.create('New Chat');
                currentSessionId = session.id;
                // Update session in store and navigate
                window.history.pushState({}, '', `/chat/${currentSessionId}`);
            } catch (error) {
                toast.error('Failed to create session');
                return;
            }
        }

        // Add user message to UI immediately
        const userMessage = {
            id: `temp-${Date.now()}`,
            role: 'user',
            content,
            createdAt: new Date().toISOString(),
        };
        dispatch(addMessage({ sessionId: currentSessionId, message: userMessage }));

        // Start streaming
        dispatch(startStreaming({ messageId: `streaming-${Date.now()}` }));

        try {
            // Send message with streaming
            await chatApi.sendMessageStream(
                currentSessionId,
                content,
                'gpt-4',
                (chunk) => {
                    dispatch(appendStreamChunk(chunk));
                },
                (fullContent) => {
                    // Create assistant message from streamed content
                    const assistantMessage = {
                        id: `msg-${Date.now()}`,
                        role: 'assistant',
                        content: fullContent,
                        createdAt: new Date().toISOString(),
                    };
                    dispatch(completeStreaming({
                        sessionId: currentSessionId,
                        message: assistantMessage,
                    }));
                },
                (error) => {
                    dispatch(stopStreaming());
                    toast.error('Failed to send message');
                    console.error(error);
                }
            );
        } catch (error) {
            dispatch(stopStreaming());
            toast.error('Failed to send message');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <MessageList
                messages={messages}
                sessionId={sessionId}
                streamingContent={streamingContent}
                isLoading={isLoading}
            />
            <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                streaming={isStreaming}
            />
        </div>
    );
}

