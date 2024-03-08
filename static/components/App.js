import Login from './Login';
import HomePage from './HomePage.js';
import Signup from './Signup';
import {isLoggedin} from '../helpers/utils.js';
import UpdateProfile from './UpdateProfile.js';
import NewChannel from './NewChannel.js';

export default function App() {
    console.log("App");
    console.log(isLoggedin());

    const history = ReactRouterDOM.useHistory();
    let path = window.location.pathname;

    // BrowserRouter isn't working properly when reloading the page with channel url parameter hence we are using generic way
    // if(path.startsWith("/channel/")) {
    //     let currentChannel = path.split('/')[2];
    //     document.title = 'Channel ' + currentChannel;
    //     history.push('/channel/' + channel);
    // }

    return (
        <ReactRouterDOM.BrowserRouter history={history}>
            <div className="App">
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route path="/signup" component={Signup}/>
                    <ReactRouterDOM.Route
                        path="/belay"
                        render={props => (
                            <HomePage channelNo={'1'} />
                        )}
                    />
                    <ReactRouterDOM.Route path="/login" component={Login} />
                    <ReactRouterDOM.Route path="/update" component={UpdateProfile} />
                    <ReactRouterDOM.Route
                        path="/channel/:channelId"
                        render={props => (
                            <HomePage channelNo={props.match.params.channelId} />
                        )}
                    />
                    <ReactRouterDOM.Route
                        path="/newchannel"
                        render={props => (
                            <NewChannel />
                        )}
                    />
                    <ReactRouterDOM.Route
                        path="/"
                        render={props => (
                            <HomePage channelNo={'1'} />
                        )}
                    />
                </ReactRouterDOM.Switch>
            </div>
        </ReactRouterDOM.BrowserRouter>
    );
}
