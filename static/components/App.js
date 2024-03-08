import Login from './Login';
import HomePage from './HomePage.js';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import Signup from './Signup';
import {isLoggedin} from '../helpers/utils.js';

export default function App() {
    console.log("App");
    let isLogged = isLoggedin()
    console.log(isLogged);

    return (
        <ReactRouterDOM.BrowserRouter>
            <div className="App">
                <ReactRouterDOM.Route render={() => (isLogged ?  <LogoutButton /> : <></>)} />
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path="/signup" component={isLogged ? HomePage : Signup}/>
                    <ReactRouterDOM.Route path="/login" component={isLogged ? HomePage : Login} />
                    <ReactRouterDOM.Route path="/homepage" component={isLogged ? HomePage : Login} />
                </ReactRouterDOM.Switch>
            </div>
        </ReactRouterDOM.BrowserRouter>
    );
}
