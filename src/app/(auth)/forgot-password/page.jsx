export default function ForgotPasswordPage() {
    return (
        <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Forgot Password</h3>
            {/* Forgot Password form placeholder */}
            <form className="mt-5 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Reset Password
                </button>
            </form>
        </div>
    );
}
