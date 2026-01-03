'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, MessageSquare, Trash2, Archive, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sessionApi } from '@/features/chat/api/sessionApi';
import { setSessions, setCurrentSession, removeSession } from '@/features/chat/store/chatSlice';
import { toast } from 'react-hot-toast';

export function ChatSidebar({ selectedSessionId, onSelectSession }) {
    const dispatch = useDispatch();
    const { sessions } = useSelector((state) => state.chat);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            setIsLoading(true);
            const response = await sessionApi.getAll({ limit: 50 });
            dispatch(setSessions(response || []));
        } catch (error) {
            toast.error('Failed to load sessions');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSession = async () => {
        try {
            setIsCreating(true);
            const response = await sessionApi.create('New Chat');
            dispatch(setSessions([response, ...sessions]));
            dispatch(setCurrentSession(response.id));
            onSelectSession?.(response.id);
            toast.success('New chat created');
        } catch (error) {
            toast.error('Failed to create session');
            console.error(error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteSession = async (sessionId, e) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this chat?')) return;

        try {
            await sessionApi.delete(sessionId);
            dispatch(removeSession(sessionId));
            if (selectedSessionId === sessionId) {
                dispatch(setCurrentSession(null));
                onSelectSession?.(null);
            }
            toast.success('Chat deleted');
        } catch (error) {
            toast.error('Failed to delete chat');
            console.error(error);
        }
    };

    const handleArchiveSession = async (sessionId, e) => {
        e.stopPropagation();
        try {
            await sessionApi.archive(sessionId);
            await loadSessions();
            toast.success('Chat archived');
        } catch (error) {
            toast.error('Failed to archive chat');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col h-full w-64 border-r bg-background">
            <div className="p-4 border-b">
                <Button
                    onClick={handleCreateSession}
                    disabled={isCreating}
                    className="w-full"
                    size="sm"
                >
                    {isCreating ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                        <Plus className="h-4 w-4 mr-2" />
                    )}
                    New Chat
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center p-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : sessions.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No chats yet. Create a new chat to get started.
                    </div>
                ) : (
                    <div className="p-2">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => {
                                    dispatch(setCurrentSession(session.id));
                                    onSelectSession?.(session.id);
                                }}
                                className={`
                                    group relative p-3 rounded-lg cursor-pointer mb-1
                                    transition-colors
                                    ${selectedSessionId === session.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-2">
                                    <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {session.title || 'Untitled Chat'}
                                        </p>
                                        {session.updatedAt && (
                                            <p className="text-xs opacity-70 mt-0.5">
                                                {new Date(session.updatedAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => handleArchiveSession(session.id, e)}
                                    >
                                        <Archive className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => handleDeleteSession(session.id, e)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

