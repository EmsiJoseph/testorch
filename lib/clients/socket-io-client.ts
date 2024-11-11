import io from 'socket.io-client';

const server = process.env.NEXT_PUBLIC_TESTORCH_BACKEND_BASE_URL;
console.log("Connecting to WebSocket server at: ", server);
const socket = io(server, {
  transports: ['websocket'], // Ensure WebSocket transport is used
  withCredentials: true, // Include credentials if needed
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

// Listen for progress updates
socket.on('progressUpdate', (progress) => {
  console.log('Progress Update:', progress);
  // Handle the progress update (e.g., update the UI)
});

// Listen for pod status updates
socket.on('podStatusUpdate', (status) => {
  console.log('Pod Status Update:', status);
  // Handle the pod status update (e.g., update the UI)
});

export default socket;