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
    msg_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY(msg_id) REFERENCES messages(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

create table groups_people (
    user_id INTEGER,
    channel_id integer,
    message_id integer,
    PRIMARY KEY(user_id, channel_id, message_id)
);