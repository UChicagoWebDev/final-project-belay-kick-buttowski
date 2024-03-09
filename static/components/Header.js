const Header = ({handleLogout}) => {
    const history = ReactRouterDOM.useHistory();

    const createNewRoom = () => {
        handleLogout();
        history.push('/newchannel');
    };

    const handleCompanyIconClick = () => {
        handleLogout();
        history.push('/belay');
    };

    const handleUpdateProfileClick = () => {
        handleLogout();
        history.push('/update');
    };

    const handleLogoutClick = () => {
        localStorage.clear();
        handleLogout();
        history.push('/belay');
    };

    return (
        <div className="header">
            <div className="left-section" onClick={createNewRoom}>
                <button onClick={createNewRoom}>Cretae new channel</button>
            </div>
            <div className="center-section" onClick={handleCompanyIconClick}>
                <img src="/static/images/belay.png" alt="Company Icon" />
            </div>
            <div className="right-section">
                <button onClick={handleUpdateProfileClick}>Update Profile</button>
                <button onClick={handleLogoutClick}>Logout</button>
            </div>
        </div>
    );
};

export default Header;
