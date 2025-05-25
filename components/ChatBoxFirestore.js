
import { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export function ChatBox({ artist }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  const room = artist.trim().toUpperCase();

  useEffect(() => {
    if (!room) return;

    const q = query(
      collection(db, "messages"),
      where("room", "==", room),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, "messages"), {
      from: artist.trim(),
      text: message,
      room,
      timestamp: serverTimestamp()
    });
    setMessage("");
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 p-4 border rounded-xl bg-white shadow text-left">
      <h2 className="text-lg font-bold mb-3">💬 Messagerie</h2>
      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto bg-gray-50 p-3 rounded border text-sm mb-4 space-y-2"
      >
        {messages.map((m, i) => {
          const isMine =
            m.from?.trim().toUpperCase() === artist.trim().toUpperCase();
          return (
            <div
              key={i}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  isMine
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{m.text}</p>
                <p className="text-[10px] text-gray-400 mt-1 text-right">
                  {m.timestamp?.toDate().toLocaleTimeString?.() ?? ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Écris ton message ici..."
        />
        <button
          onClick={send}
          className="bg-black text-white px-4 rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
