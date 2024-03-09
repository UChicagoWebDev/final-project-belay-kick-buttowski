import { createRef, useState } from 'react';
import { ALL_MESSAGES_URL, ALL_REPLIES_URL, ALL_ROOMS, GET_NO_OF_EMOJIS, POST_EMOJI, POST_MESSAGE, POST_REPLY_MESSAGE, REPLY_PARENT, UNREAD_MSGS, UPDATE_ROOM, UPDATE_UNREAD, getAllMsgsRequest, getAllRepliesRequest, noOfEmojis, postEmoji, postReplyRequest, postRequest, postUpdateRoomRequest, replyParentDict, updateUnread } from '../helpers/endpoints.js';
import {createUrl, isLoggedin} from '../helpers/utils.js';
import Header from './Header.js';

export default function HomePage({channelNo, messageNo}) {
  // console.log(channelNo)
  // console.log(messageNo)
  const history = ReactRouterDOM.useHistory();
  if(!isLoggedin()){
    const requestedPath = history.location.pathname;
    history.push('/login', { requestedPath })
    return <></>
  }
  
  document.title = 'Channel ' + channelNo;

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  // console.log(windowWidth)
  const [parentMessage, setParentMessage] = React.useState('');


  const [showChannelsPanel, setShowChannelsPanel] = React.useState(false);
  const [showMessageContainer, setShowMessageContainer] = React.useState(false);
  const [showRepliesContainer, setShowRepliesContainer] = React.useState(false);

  const [allChannels, setAllChannels] = React.useState([]);
  const [intervalId, setIntervalId] = React.useState(null);
  const [roomName, setNewRoomName] = React.useState("");
  const [editingChannel, setEditingChannel] = React.useState(-1);
  
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const [reply, setReply] = React.useState('');
  const [replies, setReplies] = React.useState([]);

  const [unReadMsgs, setUnreadMsgs] = React.useState({});
  const [replyParentName, setReplyParentName] = React.useState([]);

  const [emojiUsers, setEmojiUsers] = React.useState([]);
  const [whichEmoji, setWhichEmoji] = React.useState({
    'msgId': -1,
    'emojiId': -1
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleShowChannelsPanel = () => {
    setShowChannelsPanel(true);
    setShowMessageContainer(false);
    setShowRepliesContainer(false);
  };

  const handleShowMessageContainer = () => {
    setShowChannelsPanel(false);
    setShowMessageContainer(true);
    setShowRepliesContainer(false);
  };

  const handleShowRepliesContainer = () => {
    setShowChannelsPanel(false);
    setShowMessageContainer(false);
    setShowRepliesContainer(true);
  };

  const updateScreen = () => {
    if (windowWidth < 800) {
      if(messageNo < 0 && channelNo > 0){
        handleShowMessageContainer()
      }
      else if(messageNo > 0){
        handleShowRepliesContainer()
      }
      else {
        handleShowChannelsPanel()
      }
    } else {
      setShowChannelsPanel(true);
      setShowMessageContainer(true);
      setShowRepliesContainer(true);
    }
  }

  React.useEffect(() => {
    updateScreen();
  }, [windowWidth, messages]);

  const handleMouseEnter = async (msg_id, emoji_id) => {
    noOfEmojis.message_id = msg_id;
    noOfEmojis.emoji_id = emoji_id;
    let retrievedEmojis = await createUrl(GET_NO_OF_EMOJIS, noOfEmojis, {}, 'GET');
    // console.log(retrievedEmojis.allChannels);
    setEmojiUsers(retrievedEmojis.allE)
    setWhichEmoji({
      'msgId': msg_id,
      'emojiId': emoji_id
    })
  };

  const handleMouseLeave = (msg_id, emoji_id) => {
    setWhichEmoji({
      'msgId': -1,
      'emojiId': -1
    });
  };

  const emojis = [
    { id: 1, symbol: '😊' },
    { id: 2, symbol: '❤️' },
    { id: 3, symbol: '😂' },
    { id: 4, symbol: '👍' },
    { id: 5, symbol: '😍' }
  ];

  const handleEmojiClick = async (messageId, emojiId) => {
    postEmoji.emoji_id = emojiId;
    postEmoji.message_id = messageId;
    await createUrl(POST_EMOJI, postEmoji, {}, 'POST')
    // let temp = emojiUsers;
    // temp = temp.push(localStorage.getItem('User-Name'))
    // setEmojiUsers(temp)
  };

  const handleChannelClick = async (channel) => {
    history.push('/channel/' + channel);
  };
  

  function extractImageUrls(message) {
    const regex = /(https?:\/\/.*\.(?:png|jpg|gif))/gi;
    return message.match(regex) || [];
}

function displayImages(message) {
    const imageUrls = extractImageUrls(message);
    return imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
    ));
}

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
    postReplyRequest.message_id = messageNo;
    postReplyRequest.replies_to = messageNo;
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
        getAllRepliesRequest.message_id = messageNo;

        let retrievedMessages = await createUrl(ALL_MESSAGES_URL, getAllMsgsRequest, {}, 'GET');
        let rooms = await createUrl(ALL_ROOMS, {}, {}, 'GET')
        setMessages(retrievedMessages.allM);
        setAllChannels(rooms.allC);
        if(messageNo > 0){
          let replies = await createUrl(ALL_REPLIES_URL, getAllRepliesRequest, {}, 'GET')
          setReplies(replies.allR);
        }
        
        let unreadMsgs = await createUrl(UNREAD_MSGS, {}, {}, 'GET');
        setUnreadMsgs(unreadMsgs.allUr);

        updateUnread.channel_id = channelNo;
        await createUrl(UPDATE_UNREAD, updateUnread, {}, 'POST');

        if(messageNo > 0){
          replyParentDict.message_id = messageNo;
          let repliedParentName = await createUrl(REPLY_PARENT, replyParentDict, {}, 'GET');
          setReplyParentName(repliedParentName.allM[0].name);
        }
    }, 300);

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

  const handleReply = (messageId, messageName) => {
    // history.push('/channel/' + channelNo + '/message/' + messageId);
    history.push( '/channel/' + channelNo + '/message/' + messageId );
    // setRepliesOf(messageId);
    // console.log(`Replying to message with ID ${messageId}`);
  };

  const closeReplies = () => {
    history.push('/channel/' + channelNo);
    // setRepliesOf(-1);
  }

  const closeMessages = () => {
    history.push('/belay');
    // setRepliesOf(-1);
  }

  return (
    <>
      <Header handleLogout={handleLogout}/>
      <div className="home-screen">
        {showChannelsPanel && (<div className="channels-panel">
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
                        # {channel.name}
                        {unReadMsgs[channel.id] != undefined && unReadMsgs[channel.id] > 0 && (
                          <div className="unreadmsgs">
                              {unReadMsgs[channel.id]} {'New Messages'}
                          </div>
                        )}
                        <span key={channel.id + allChannels.length} className="material-symbols-outlined md-18" onClick={() => handleEditClick(channel.id)}>edit</span>
                    </div>
                  )
                }
              </>
            ))}
          </ul>
        </div>)}

        {showMessageContainer && channelNo > 0 ? (<div className="message-container">
          <div className="close-button" onClick={() => closeMessages()}>
                  <span className="material-symbols-outlined md-18">close</span>
          </div>
          <div className="conversation">
              {messages.map(msg => (
                  <>
                    <div key={msg.id} className="message">
                        <div className="author">{msg.name}</div>
                        <div className="body">{msg.body}</div>
                        {displayImages(msg.body)}
                        <div className="reply-button" onClick={() => handleReply(msg.id, msg.body)}>
                          <span className="material-symbols-outlined md-18">reply</span>
                        </div>
                        <div className="emojis">
                          {emojis.map(emoji => (
                            <span
                              key={emoji.id}
                              className="emoji"
                              onClick={() => {
                                handleEmojiClick(msg.id, emoji.id);
                              }}
                              onMouseEnter={() => handleMouseEnter(msg.id, emoji.id)} onMouseLeave={() => handleMouseLeave(msg.id, emoji.id)}
                              style={{ cursor: 'pointer', marginRight: '5px', fontSize: '20px' }}
                            >
                              <div className="tooltip">{emoji.symbol}{(emoji.id == whichEmoji['emojiId'] && msg.id == whichEmoji['msgId']) ? emojiUsers.length : <></>}
                                  {(emoji.id == whichEmoji['emojiId'] && msg.id == whichEmoji['msgId'] && emojiUsers.length > 0) ? (<span className="tooltiptext">{emojiUsers.map((name, index) => name + (index < (emojiUsers.length - 1) ? ", ": ""))}</span>) : <></>}
                              </div>
                            </span>
                          ))}
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
        </div>): <></>}

        {showMessageContainer && channelNo < 0 ? (
        <div className="message-container">
          <div className="welcome-container">
            <div className="welcome-box">
              <h1 className="welcome-message">Welcome {localStorage.getItem('harshajulakanti-User-Name')},</h1>
              <p>Start exploring by selecting a channel</p>
            </div>
          </div>
        </div>) : <></>}

        {
          (showRepliesContainer && messageNo > 0) ? (
            <div className="replies-container">
              <div className="close-button" onClick={() => closeReplies()}>
                  <span className="material-symbols-outlined md-18">close</span>
              </div>
              <div className="conversation">
                <div className="parent-message">
                  <p className="parent-message-text">{'Replying to ' + replyParentName}</p>
                </div>
                {replies.map(msg => (
                    <>
                      <div key={msg.id} className="message">
                          <div className="author">{msg.name}</div>
                          <div className="body">{msg.body}</div>
                          {displayImages(msg.body)}
                          <div className="emojis">
                          {emojis.map(emoji => (
                              <span
                                key={emoji.id}
                                className="emoji"
                                onClick={() => {
                                  handleEmojiClick(msg.id, emoji.id);
                                }}
                                onMouseEnter={() => handleMouseEnter(msg.id, emoji.id)} onMouseLeave={() => handleMouseLeave(msg.id, emoji.id)}
                                style={{ cursor: 'pointer', marginRight: '5px', fontSize: '20px' }}
                              >
                                <div className="tooltip">{emoji.symbol}{(emoji.id == whichEmoji['emojiId'] && msg.id == whichEmoji['msgId']) ? emojiUsers.length : <></>}
                                    {(emoji.id == whichEmoji['emojiId'] && msg.id == whichEmoji['msgId'] && emojiUsers.length > 0) ? (<span className="tooltiptext">{emojiUsers.map((name) => name + ", ")}</span>) : <></>}
                                </div>
                              </span>
                            ))}
                          </div>
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
