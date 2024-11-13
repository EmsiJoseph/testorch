import io, { Socket } from "socket.io-client"

declare global {
  interface Global {
    socket: Socket | undefined
  }

  var socket: Socket | undefined
}

const serverUrl = process.env.NEXT_PUBLIC_TESTORCH_BACKEND_BASE_URL
console.log("Connecting to WebSocket server at: ", serverUrl)

let socket: Socket
if (!globalThis.socket) {
  globalThis.socket = io(serverUrl, {
    transports: ["websocket"], // Ensure WebSocket transport is used
    withCredentials: true, // Include credentials if needed
  })
}
socket = globalThis.socket

socket.on("connect", () => {
  console.log("Connected to WebSocket server")
})

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server")
})

// Listen for progress updates
socket.on("buildStatus", (progress) => {
  console.log("Progress Update:", progress)
  // Handle the progress update (e.g., update the UI)
})

// Listen for pod status updates
socket.on("podsStatus", (status) => {
  console.log("Pod Status Update:", status)
  // Handle the pod status update (e.g., update the UI)
})

// Listen for test completion
socket.on("testCompleted", (result) => {
  console.log("Test Completed:", result)
  // Handle the test completion (e.g., update the UI)
})

// Listen for test errors
socket.on("testError", (error) => {
  console.error("Test Error:", error)
  // Handle the test error (e.g., show an error message)
})

export default socket
