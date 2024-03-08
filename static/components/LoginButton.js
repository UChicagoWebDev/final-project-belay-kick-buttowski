const LoginButton = () => {
    const handleLogin = () => {
        console.log('Login clicked');
    };

    return (
        <button className="login-button" onClick={handleLogin}>
            Login
        </button>
    );
};

export default LoginButton;
