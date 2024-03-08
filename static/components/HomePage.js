
const channels = [
  { id: 1, name: 'General' },
  { id: 2, name: 'Random' },
  { id: 3, name: 'Announcements' },
];

export default function HomePage() {
  console.log("Home");
  const [currentChannel, setCurrentChannel] = React.useState(null);
  const [showThread, setShowThread] = React.useState(false);

  const handleChannelClick = (channel) => {
      setCurrentChannel(channel);
      setShowThread(false); // Close thread panel when switching channels
  };

  const handleThreadClick = () => {
      setShowThread(true);
  };

  return (
      <div className="home-screen">
        <div className="messages-panel">
          <div className="header">
            <h2>{currentChannel ? currentChannel.name : 'Select a Channel'}</h2>
            {currentChannel && (
              <button className="thread-toggle-btn" onClick={handleThreadClick}>
                {showThread ? 'Hide Replies' : 'Show Replies'}
              </button>
            )}
          </div>
          <div className="messages">
            {currentChannel && (
              <div className="message-conversation">
                Message conversation for {currentChannel.name}
              </div>
            )}
            {showThread && (
              <div className="thread">
                Replies for the selected message
              </div>
            )}
          </div>
        </div>
        <div className="channels-panel">
          <h2>Channels</h2>
          <ul>
            {channels.map(channel => (
              <li key={channel.id} className={channel === currentChannel ? 'active' : ''} onClick={() => handleChannelClick(channel)}>
                {channel.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};
