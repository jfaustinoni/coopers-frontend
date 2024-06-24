import { useRouter } from 'next/router';

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');

        onLogout();
        router.push('/');
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
