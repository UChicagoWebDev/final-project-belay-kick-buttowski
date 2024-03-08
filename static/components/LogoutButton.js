export default function LogoutButton() {
    const history = ReactRouterDOM.useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/belay');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};
