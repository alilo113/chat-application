import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { JoinChatForm } from './JoinChatForm';
import { ChatRoom } from './chatRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinChatForm />} />
      <Route path="chat-room" element={<ChatRoom/>}/>
    </Routes>
  );
}

export default App;