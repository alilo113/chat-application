import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to your server

export function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Run only once when the component mounts

  const sendMessage = () => {
    // Send the message to the server
    socket.emit("message", inputMessage);

    // Clear the input field
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-md rounded px-8 py-6 mb-auto">
        {/* Display messages here */}
        {messages.map((msg, index) => (
          <div key={index}>{msg.Name}</div>
        ))}
      </div>
      <div className="flex items-center mt-auto mb-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow rounded-lg bg-gray-100 py-3 px-4 focus:outline-none m-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 ml-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </div>
    </div>
  );
}