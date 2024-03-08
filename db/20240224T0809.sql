create table users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(40) UNIQUE,
  password VARCHAR(40),
  api_key VARCHAR(40) UNIQUE
);

create table channels (
  id INTEGER PRIMARY KEY,
  channel_name VARCHAR(40) UNIQUE
);
