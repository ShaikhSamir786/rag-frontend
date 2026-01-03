export default function DocumentDetailsPage({ params }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Document Details</h1>
            <p>Details for document ID: {params.id}</p>
        </div>
    );
}
