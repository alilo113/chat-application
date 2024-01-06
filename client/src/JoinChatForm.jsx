import React, { useState } from "react";
import axios from "axios";

export function JoinChatForm() {
  const [name, setName] = useState("");

  const handleJoinChat = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/messages", {
        name: name,
      });
      console.log(`Successfully added ${name} to the database!`);
      setName("");
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