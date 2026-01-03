'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chatApi } from '@/features/chat/api/chatApi';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

export function ChatMessage({ message, sessionId }) {
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState(message.feedback?.rating || null);

    const isUser = message.role === 'user';
    const isAssistant = message.role === 'assistant';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast.success('Copied to clipboard');
        } catch (error) {
            toast.error('Failed to copy');
        }
    };

    const handleFeedback = async (rating) => {
        if (feedback === rating) {
            // Toggle off
            setFeedback(null);
            return;
        }

        try {
            await chatApi.addFeedback(message.id, rating);
            setFeedback(rating);
            toast.success('Feedback submitted');
        } catch (error) {
            toast.error('Failed to submit feedback');
        }
    };

    return (
        <div className={`flex gap-4 p-4 ${isUser ? 'bg-muted/50' : ''}`}>
            <div className="flex-shrink-0">
                <div className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}
                `}>
                    {isUser ? 'U' : 'A'}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">
                        {isUser ? 'You' : 'Assistant'}
                    </span>
                    {message.createdAt && (
                        <span className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                    )}
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                    {isAssistant ? (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                </div>
                {message.metadata?.citations && message.metadata.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t">
                        <p className="text-xs font-medium mb-1">Sources:</p>
                        <div className="flex flex-wrap gap-1">
                            {message.metadata.citations.map((citation, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs px-2 py-1 bg-muted rounded"
                                >
                                    {citation.document || citation.source || `Source ${idx + 1}`}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {isAssistant && (
                    <div className="flex items-center gap-2 mt-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-8"
                        >
                            {copied ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeedback('positive')}
                            className={`h-8 ${feedback === 'positive' ? 'text-green-600' : ''}`}
                        >
                            <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFeedback('negative')}
                            className={`h-8 ${feedback === 'negative' ? 'text-red-600' : ''}`}
                        >
                            <ThumbsDown className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

