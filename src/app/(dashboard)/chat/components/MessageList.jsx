'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/components/features/chat/ChatMessage';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function MessageList({ messages, sessionId, streamingContent, isLoading }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingContent]);

    if (isLoading && messages.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (messages.length === 0 && !streamingContent) {
        return (
            <div className="flex items-center justify-center h-full text-center">
                <div>
                    <p className="text-lg font-medium text-muted-foreground mb-2">
                        Start a conversation
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Ask a question or upload a document to get started
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                        sessionId={sessionId}
                    />
                ))}
                {streamingContent && (
                    <div className="flex gap-4 p-4">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium bg-secondary text-secondary-foreground">
                                A
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <ReactMarkdown>{streamingContent}</ReactMarkdown>
                            </div>
                            <div className="mt-2">
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground inline-block" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

