import { createRef } from 'react';
import { ALL_MESSAGES_URL, ALL_REPLIES_URL, ALL_ROOMS, POST_MESSAGE, POST_REPLY_MESSAGE, UPDATE_ROOM, getAllMsgsRequest, getAllRepliesRequest, postReplyRequest, postRequest, postUpdateRoomRequest } from '../helpers/endpoints.js';
import {createUrl, isLoggedin} from '../helpers/utils.js';
import Header from './Header.js';

export default function HomePage({channelNo}) {
  console.log("Home");
  const history = ReactRouterDOM.useHistory();
  if(!isLoggedin()){
    history.push('/login')
    return <></>
  }
  
  document.title = 'Channel ' + channelNo;
  const [allChannels, setAllChannels] = React.useState([]);
  const [intervalId, setIntervalId] = React.useState(null);
  const [roomName, setNewRoomName] = React.useState("");
  const [editingChannel, setEditingChannel] = React.useState(-1);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const [reply, setReply] = React.useState('');
  const [repliesOf, setRepliesOf] = React.useState(-1);
  const [replies, setReplies] = React.useState([]);


  const handleChannelClick = async (channel) => {
    history.push('/channel/' + channel);
  };
  
  const sendMessage = async () => {
      if (message.trim() === '') return;
  
      postRequest.room_id = channelNo;
      postRequest.body = message;
      await createUrl(POST_MESSAGE, postRequest, {}, 'POST')
      setMessage('');
  };

  const sendReply = async () => {
    if (reply.trim() === '') return;

    postReplyRequest.room_id = channelNo;
    postReplyRequest.body = reply;
    postReplyRequest.message_id = repliesOf;
    postReplyRequest.replies_to = repliesOf;
    await createUrl(POST_REPLY_MESSAGE, postReplyRequest, {}, 'POST')
    setReply('');
  };

  const handleInputChange = (e) => {
      setMessage(e.target.value);
  };

  const handleInputReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleLogout = () => {
    clearInterval(intervalId);
  };

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
        if (channelNo === 0) return;

        getAllMsgsRequest.room_id = channelNo;
        getAllRepliesRequest.room_id = channelNo;
        getAllRepliesRequest.message_id = repliesOf;
        let retrievedMessages = await createUrl(ALL_MESSAGES_URL, getAllMsgsRequest, {}, 'GET');
        let rooms = await createUrl(ALL_ROOMS, {}, {}, 'GET')
        setMessages(retrievedMessages.allM);
        setAllChannels(rooms.allC);
        if(repliesOf > 0){
          let replies = await createUrl(ALL_REPLIES_URL, getAllRepliesRequest, {}, 'GET')
          setReplies(replies.allR);
        }
    }, 200);

    setIntervalId(intervalId);

    return () => {
        clearInterval(intervalId);
    };
  }, [messages, channelNo]);

  const handleEditClick = (channel) => {
    setEditingChannel(channel);
  };

  const handleSaveClick = async (channel) => {
    if (roomName.trim() === '') return;
    postUpdateRoomRequest.room_id = channel;
    postUpdateRoomRequest.name = roomName;
    await createUrl(UPDATE_ROOM, postUpdateRoomRequest, {}, 'POST');
    setEditingChannel(-1);
  };

  const handleRoomNameChange = (e) => {
    const {name, value} = e.target
    setNewRoomName(value);
  };

  const handleReply = (messageId) => {
    setRepliesOf(messageId);
    console.log(`Replying to message with ID ${messageId}`);
  };

  const closeReplies = () => {
    setRepliesOf(-1);
  }

  return (
    <>
      <Header handleLogout={handleLogout}/>
      <div className="home-screen">
        <div className="channels-panel">
          <h2>Channels</h2>
          <ul>
            {allChannels.map(channel => (
              <>
                {
                  editingChannel == channel.id ? (
                    <div className={channel.id == channelNo ? 'channel-item-container active' : 'channel-item-container'}>
                        <input name="newRoomName" onChange={handleRoomNameChange}></input>
                        <span className="material-symbols-outlined md-18" onClick={() => handleSaveClick(channel.id)}>save</span>
                    </div>
                  ) : (
                    <div key={channel.id} className={channel.id == channelNo ? 'channel-item-container active' : 'channel-item-container'} onClick={() => handleChannelClick(channel.id)}>
                        {channel.name}
                        <span key={channel.id + allChannels.length} className="material-symbols-outlined md-18" onClick={() => handleEditClick(channel.id)}>edit</span>
                    </div>
                  )
                }
              </>
            ))}
          </ul>
        </div>

        <div className="message-container">
          <div className="conversation">
              {messages.map(msg => (
                  <>
                    <div key={msg.id} className="message">
                        <div className="author">{msg.name}</div>
                        <div className="body">{msg.body}</div>
                        <div className="reply-button" onClick={() => handleReply(msg.id)}>
                          <span className="material-symbols-outlined md-18">reply</span>
                        </div>
                        {msg.replies > 0 && (
                          <div className="replies" onClick={() => handleReply(msg.id)}>
                              {msg.replies} {msg.replies == 1 ? 'reply' : 'replies'}
                          </div>
                        )}
                    </div>
                  </>
              ))}
          </div>

          <div className="message-input">
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>

        

        {
          repliesOf > 0 ? (
            <div className="replies-container">
              <div className="close-button" onClick={() => closeReplies()}>
                  <span className="material-symbols-outlined md-18">close</span>
              </div>
              <div className="conversation">
                {replies.map(msg => (
                    <>
                      <div key={msg.id} className="message">
                          <div className="author">{msg.name}</div>
                          <div className="body">{msg.body}</div>
                      </div>
                    </>
                ))}
              </div>

              <div className="message-input">
                <input
                    type="text"
                    value={reply}
                    onChange={handleInputReplyChange}
                    placeholder="Type your message..."
                />
                <button onClick={sendReply}>Send</button>
              </div>

            </div>
          ) : (
            <></>
          )
        }
          
      </div>
    </>
  );
};
