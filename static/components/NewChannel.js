import Image from './Image.js'
import {createUrl, isLoggedin} from '../helpers/utils.js';
import {NEW_ROOM_POINT, SIGNUP_DETAILS_POINT, loginDict, newRoomEp} from '../helpers/endpoints.js';

export default function NewChannel(){
    // console.log("NewRoom");
    const history = ReactRouterDOM.useHistory();
    if(!isLoggedin()){
        const requestedPath = history.location.pathname;
        history.push('/login', { requestedPath })
        return <></>
    }
    document.title = 'Create Channel';
    const [formData, setFormData] = React.useState({
        roomname: '',
    });

    const handleNewRoom = async (e) => {
        e.preventDefault();
        newRoomEp.channelName = formData.roomname;
        let newRoom = await createUrl(NEW_ROOM_POINT, newRoomEp, {}, 'POST');
        history.push('/channel/' + newRoom.channel_id);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (<>
        <div className="container">
            <div className="form-container">
                <Image url={"static/images/belay.png"} title={"Belay Logo"}/>
                <h2>Create Channel</h2>
                <form onSubmit={handleNewRoom} >
                    <input type='text' name='roomname' placeholder='Channel Name' value={formData.roomname} onChange={handleInputChange} required />
                    <input type='submit' value='Create'></input>
                </form>
            </div>
        </div>
    </>)
}
