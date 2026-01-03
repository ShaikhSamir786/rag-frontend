export default function ChatSessionPage({ params }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Chat Session</h1>
            <p>Session ID: {params.sessionId}</p>
        </div>
    );
}
