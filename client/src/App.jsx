import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ul id="messages" className="flex-1 overflow-y-auto list-none p-0">
        {/* Messages will appear here */}
      </ul>
      <form
        id="form"
        action=""
        className="bg-opacity-25 bg-black py-1 fixed bottom-0 left-0 right-0 flex items-center"
      >
        <input
          id="input"
          autoComplete="off"
          className="flex-grow border-none px-4 rounded-full my-1 mx-2 h-10"
        />
        <button
          type="submit"
          className="bg-gray-700 border-none py-1 px-4 rounded focus:outline-none text-white my-1 mx-2"
        >
          Send
        </button>
      </form>
    </div>
  );  
}

export default App