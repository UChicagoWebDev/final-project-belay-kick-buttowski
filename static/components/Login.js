import Image from './Image'
import {createUrl} from '../helpers/utils.js';
import {LOGIN_POINT, loginDict} from '../helpers/endpoints.js';

export default function Login(){
    console.log("Login");
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });
    const history = ReactRouterDOM.useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        loginDict.userName = formData.username;
        loginDict.password = formData.password;
        let loginUsr = await createUrl(LOGIN_POINT, {}, loginDict, 'POST');
        if(loginUsr.api_key.length > 0){
            localStorage.setItem('API-KEY', loginUsr.api_key);
            localStorage.setItem('User-Id', loginUsr.user_id);
            localStorage.setItem('User-Name', loginUsr.user_name);

            setFormData({
                username: '',
                password: ''
            });

            history.push('homepage');
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const openSignUp = (e) => {
        history.push('signup');
    };

    return (<>
        <div className="container">
            <div className="form-container">
                <Image url={"static/images/belay.png"} title={"Belay Logo"}/>
                <h2>Login</h2>
                <form onSubmit={handleLogin} >
                    <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleInputChange} required />
                    <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} required />
                    <input type='submit' value='Login'></input>
                </form>
                <div className="signup-prompt-container">
                    <p>Don't have an account?</p>
                    <button className="signup-button" onClick={openSignUp}>Signup</button>
                </div>
            </div>
        </div>
    </>)
}
