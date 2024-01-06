import React from "react";

export function ChatRoom() {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-md rounded px-8 py-6 mb-auto">
      </div>
      <div className="flex items-center mt-auto mb-3">
        <input
          type="text"
          className="flex-grow rounded-lg bg-gray-100 py-3 px-4 focus:outline-none m-2"
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 ml-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send
        </button>
      </div>
    </div>
  );
}