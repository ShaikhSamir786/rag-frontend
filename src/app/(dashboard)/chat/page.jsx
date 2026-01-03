'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChatSidebar } from '@/components/features/chat/ChatSidebar';
import { ChatInterface } from './components/ChatInterface';
import { setCurrentSession } from '@/features/chat/store/chatSlice';
import { useDispatch } from 'react-redux';

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const sessionId = params?.sessionId || null;

    useEffect(() => {
        if (sessionId) {
            dispatch(setCurrentSession(sessionId));
        }
    }, [sessionId, dispatch]);

    const handleSelectSession = (newSessionId) => {
        if (newSessionId) {
            router.push(`/chat/${newSessionId}`);
        } else {
            router.push('/chat');
        }
    };

    return (
        <div className="flex h-full">
            <ChatSidebar
                selectedSessionId={sessionId}
                onSelectSession={handleSelectSession}
            />
            <div className="flex-1 flex flex-col">
                <ChatInterface sessionId={sessionId} />
            </div>
        </div>
    );
}
