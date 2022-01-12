import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_WEBSOCKET_URL);

export default socket;
