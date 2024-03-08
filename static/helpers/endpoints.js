export const SPLASH = document.querySelector(".splash");
export const PROFILE = document.querySelector(".profile");
export const LOGIN = document.querySelector(".login");
export const ROOM = document.querySelector(".room");

export const POST_MESSAGE = '/api/room/post'
export const SIGNUP_POINT = '/api/signup';
export const SIGNUP_DETAILS_POINT = '/api/signup/details';
export const LOGIN_POINT = '/api/login';
export const NEW_ROOM_POINT = '/api/rooms/new';
export const ALL_MESSAGES_URL = '/api/room/messages';
export const ALL_ROOMS = '/api/rooms';
export const UPDATE_USERNAME = '/api/update/username';
export const UPDATE_PASSWORD = '/api/update/password';
export const UPDATE_ROOM = '/api/update/room';
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

export let postRequest = {
  room_id: 0,
  body: ''
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
