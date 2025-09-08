// In src/pages/RegisterPage.jsx

const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!username || !password) {
        setMessage('Username and password are required.');
        return;
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, { // CORRECTED
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            setMessage('Registration successful! You can now log in.');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setMessage(data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        setMessage('An error occurred. Please try again later.');
    }
};