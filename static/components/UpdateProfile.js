import Image from './Image.js'
import {createUrl, isLoggedin} from '../helpers/utils.js';
import {SIGNUP_DETAILS_POINT, UPDATE_PASSWORD, UPDATE_USERNAME, loginDict, postUpdateNameRequest, postUpdatePassRequest} from '../helpers/endpoints.js';

export default function UpdateProfile(){
    // console.log("Update");
    const history = ReactRouterDOM.useHistory();
    if(!isLoggedin()){
        history.push('/login')
        return <></>
    }
    document.title = 'Profile Update';
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        repeatedPassword: ''
    });
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);

    const updateUserName = async (e) => {
        if(!passwordsMatch){
            return
        }
        e.preventDefault();
        postUpdateNameRequest.user_name = formData.username;
        await createUrl(UPDATE_USERNAME, postUpdateNameRequest, {}, 'POST');
        localStorage.setItem('harshajulakanti-User-Name', formData.username);
        setFormData({
            username: '',
        });
    };

    const updatePassword = async (e) => {
        if(!passwordsMatch){
            return
        }
        e.preventDefault();
        postUpdatePassRequest.Password = formData.password;
        let postMsg = await createUrl(UPDATE_PASSWORD, {}, postUpdatePassRequest, 'POST');
        setFormData({
            password: '',
            repeatedPassword: ''
        });
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
        history.push('/belay');
    };

    return (<>
        <div className="container">
            <div className="form-container">
                <Image url={"static/images/belay.png"} title={"Belay Logo"}/>
                <h2>Update Profile</h2>
                <form onSubmit={updateUserName} >
                    <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleInputChange} required />
                    <input type='submit' value='Update username'></input>
                </form>

                <form onSubmit={updatePassword} >
                    <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleInputChange} required />
                    <input type='password' name='repeatedPassword' placeholder='Repeat Password' className={passwordsMatch ? '' : 'password-mismatch'} value={formData.repeatedPassword} onChange={handleInputChange} required />
                    <input type='submit' value='Update password'></input>
                </form>
            </div>

            <div className="signup-prompt-container">
                <p>Done with your changes?</p>
                <button className="signup-button" onClick={openLogin}>Let's go back...</button>
            </div>
        </div>
    </>)
}
