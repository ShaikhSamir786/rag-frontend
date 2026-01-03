'use client';

import { useState } from 'react';

const ChatSidebar = ({ selectedSession, onSelectSession }) => <div>Chat Sidebar</div>;
const ChatInterface = ({ messages, onSendMessage, isLoading }) => <div>Chat Interface</div>;
const useChat = (id) => ({ messages: [], sendMessage: () => { }, isLoading: false });

export default function ChatPage() {
    const [selectedSession, setSelectedSession] = useState(null);
    const { messages, sendMessage, isLoading } = useChat(selectedSession);

    return (
        <div className="flex h-full gap-6">
            <ChatSidebar
                selectedSession={selectedSession}
                onSelectSession={setSelectedSession}
            />
            <div className="flex-1">
                <ChatInterface
                    messages={messages}
                    onSendMessage={sendMessage}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
