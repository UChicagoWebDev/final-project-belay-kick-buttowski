create table messages (
  id INTEGER PRIMARY KEY,
  channel_id INTEGER,
  user_id INTEGER,
  body TEXT,
  replies_to INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(channel_id) REFERENCES rooms(id)
);

create table emojis (
    emoji_id INTEGER,
    msg_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY(msg_id) REFERENCES messages(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

create table groups_people (
    user_id INTEGER,
    channel_id INTEGER,
    message_id INTEGER,
    PRIMARY KEY(user_id, channel_id)
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(message_id) REFERENCES messages(id)
    FOREIGN KEY(channel_id) REFERENCES channels(id)
);
