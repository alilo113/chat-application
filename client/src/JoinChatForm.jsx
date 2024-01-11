import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function JoinChatForm() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoinChat = async () => {
    try {
      await axios.post("http://localhost:3000/api/messages", {
        name: name,
      });

      // Redirect to the chat room after successful join
      navigate("/chat");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">Welcome to the Chat Room</h2>
      <div className="flex items-center border border-gray-300 rounded-md p-2">
        <input
          className="flex-1 py-2 px-4 mr-2 focus:outline-none"
          type="text"
          placeholder="Type your name here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleJoinChat}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Join Chat
        </button>
      </div>
      <p className="mt-4 text-gray-600">Join the conversation!</p>
    </div>
  );
}