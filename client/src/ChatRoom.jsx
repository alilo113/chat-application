import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { path: "/socket" });

export function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputMessage) {
      socket.emit("message", { text: inputMessage }); // Assuming text-based message
      setInputMessage("");
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-md rounded px-8 py-6 mb-auto">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.Name}:</strong> {msg.text}
            {msg.image && <img src={msg.image} alt="Received Image" />}
          </div>
        ))}
      </div>
      <form className="flex items-center mt-auto mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow rounded-lg bg-gray-100 py-3 px-4 focus:outline-none m-2"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 ml-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </form>
    </div>
  );
}