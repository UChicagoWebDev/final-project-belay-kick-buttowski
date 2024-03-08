const LogoutButton = () => {
    const history = ReactRouterDOM.useHistory();

    const handleLogout = () => {
        localStorage.clear();
        history.push('homepage');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;