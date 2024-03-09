export const POST_MESSAGE = '/api/room/post'
export const POST_REPLY_MESSAGE = '/api/room/reply'
export const SIGNUP_POINT = '/api/signup';
export const SIGNUP_DETAILS_POINT = '/api/signup/details';
export const LOGIN_POINT = '/api/auth/user';
export const NEW_ROOM_POINT = '/api/rooms/new';
export const ALL_MESSAGES_URL = '/api/room/messages';
export const ALL_REPLIES_URL = '/api/room/replies';
export const ALL_ROOMS = '/api/rooms';
export const UPDATE_USERNAME = '/api/update/username';
export const UPDATE_PASSWORD = '/api/update/password';
export const UPDATE_ROOM = '/api/update/room';
export const GET_NO_OF_EMOJIS = '/api/message/emojis';
export const POST_EMOJI = '/api/message/emojipost';
export const UNREAD_MSGS = '/api/user/unread';
export const UPDATE_UNREAD = '/api/update/user/unread';
export const REPLY_PARENT = '/api/reply/parent';
export const ERROR = '/api/error';

export let rooms = {};
export let old_path = '';
export let CURRENT_ROOM = 0;

export let loginDict = {
  userName: '',
  password: ''
};

export let getAllMsgsRequest = {
  room_id: 0
};

export let getAllRepliesRequest = {
  room_id: 0,
  message_id: 0
};

export let postRequest = {
  room_id: 0,
  body: ''
};

export let postReplyRequest = {
  room_id: 0,
  body: '',
  message_id: 0,
  replies_to: 0
};

export let postUpdateNameRequest = {
  user_name: ''
};

export let postUpdatePassRequest = {
  Password: ''
};

export let postUpdateRoomRequest = {
  name: '',
  room_id: 0
};

export let signUpDetails = {
  userName: '',
  Password: ''
};

export let newRoomEp = {
  channelName: ''
};

export let noOfEmojis = {
  message_id: '',
  emoji_id: ''
};

export let postEmoji = {
  message_id: '',
  emoji_id: ''
};

export let updateUnread = {
  message_id: '',
  channel_id: ''
};

export let replyParentDict = {
  message_id: ''
};
