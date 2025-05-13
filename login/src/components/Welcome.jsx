import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 p-8 glass-effect rounded-2xl shadow-xl animate-fade-in hover-scale">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
                        <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
                    <p className="text-gray-600 mb-4">
                        You have successfully logged in as <span className="font-semibold text-indigo-600">{user.username}</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-8">Your session will expire in 10 hours</p>
                    <button
                        onClick={handleLogout}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome; 