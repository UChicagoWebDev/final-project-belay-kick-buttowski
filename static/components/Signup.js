import Image from './Image.js'
import {createUrl, isLoggedin} from '../helpers/utils.js';
import {SIGNUP_DETAILS_POINT, loginDict} from '../helpers/endpoints.js';

export default function Signup(){
    // console.log("Signup");
    const history = ReactRouterDOM.useHistory();
    if(isLoggedin()){
        history.push('/belay')
        return <></>
    }
    document.title = 'Signup';
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        repeatedPassword: ''
    });
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);

    const handleSignup = async (e) => {
        if(!passwordsMatch){
            return
        }
        e.preventDefault();
        loginDict.userName = formData.username;
        loginDict.password = formData.password;
        let loginUsr = await createUrl(SIGNUP_DETAILS_POINT, {}, loginDict, 'POST');
        if(loginUsr.api_key.length > 0){
            localStorage.setItem('harshajulakanti-API-KEY', loginUsr.api_key);
            localStorage.setItem('harshajulakanti-User-Id', loginUsr.user_id);
            localStorage.setItem('harshajulakanti-User-Name', loginUsr.user_name);

            setFormData({
                username: '',
                password: '',
                repeatedPassword: ''
            });
            
            history.push('/belay');
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'repeatedPassword') {
            setPasswordsMatch(formData.password === value);
        }
    };

    const openLogin = (e) => {
        history.push('/login');
    };

    return (<>
        <div className="container">
            <div className="form-container">
                <Image url={"static/images/belay.png"} title={"Belay Logo"}/>
                <h2>Signup</h2>
                <form onSubmit={handleSignup} >
                    <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleInputChange} required />
                    <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} required />
                    <input type='password' name='repeatedPassword' placeholder='Repeat Password' className={passwordsMatch ? '' : 'password-mismatch'} value={formData.repeatedPassword} onChange={handleInputChange} required />
                    <input type='submit' value='Signup'></input>
                </form>
                <div className="signup-prompt-container">
                    <p>Already have an account?</p>
                    <button className="signup-button" onClick={openLogin}>Login</button>
                </div>
            </div>
        </div>
    </>)
}
