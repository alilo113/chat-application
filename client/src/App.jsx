import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("paired", (message) => {
      console.log(message); // Log the paired message
      // You can set some state to handle the pairing acknowledgment UI if needed
    });

    socket.on("chat message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, { id: msg.id, text: msg.text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleMessageSubmit(e) {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      socket.emit("chat message", { id: Date.now(), text: message });
      setMessage("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="p-4">
        <ul id="messages" className="overflow-y-auto list-none p-0">
          {messages.map((msg) => (
            <li key={msg.id} className="mb-2">
              <p className="bg-blue-200 p-2 rounded-lg inline-block">
                {msg.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleMessageSubmit} className="p-4 flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;