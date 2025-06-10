
import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

export function ChatBox({ artist, isAdmin = false, currentChat = null }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const conversationId = isAdmin
  ? currentChat
    ? `admin-${currentChat.trim().toUpperCase()}`
    : null
  : `admin-${artist.trim().toUpperCase()}`;

  useEffect(() => {
    if (!conversationId) return;

    const messagesRef = collection(db, "messages", conversationId, "chats");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);

      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!input.trim() || !conversationId) return;

    const messagesRef = collection(db, "messages", conversationId, "chats");
    await addDoc(messagesRef, {
      sender: isAdmin ? "admin" : artist,
      message: input.trim(),
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto bg-white border border-gray-300 p-2 rounded mb-4"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="text-left mb-2">
            <span className="font-semibold text-sm text-gray-600">
              {msg.sender === "admin" ? "👨‍💼 Admin" : `🎤 ${msg.sender}`}
            </span>
            <p className="text-gray-800 text-sm">{msg.message}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded px-3 py-2"
          placeholder="Tape ton message ici..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded hover:bg-black"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
