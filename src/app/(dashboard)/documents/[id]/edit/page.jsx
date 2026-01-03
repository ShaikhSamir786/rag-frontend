export default function DocumentEditPage({ params }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Document</h1>
            <p>Editing document ID: {params.id}</p>
        </div>
    );
}
