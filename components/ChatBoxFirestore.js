
import { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export function ChatBox({ artist }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("room", "==", artist),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [artist]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, "messages"), {
      from: artist,
      text: message,
      timestamp: serverTimestamp(),
      room: artist
    });
    setMessage("");
  };

  return (
    <div className="w-full mx-auto mt-6 max-w-xl p-4 border rounded-xl bg-white shadow text-left">
      <h2 className="text-lg font-bold mb-3">💬 Discussion avec OTMQC</h2>
      <div ref={scrollRef} className="h-64 overflow-y-auto bg-gray-50 p-3 rounded border text-sm mb-4 space-y-2">
        {messages.length === 0 && (
          <p className="text-gray-400 italic">Aucun message encore. Commence la discussion !</p>
        )}
        {messages.map((m, i) => {
          const isMine = m.from === artist;
          return (
            <div
              key={i}
              className={\`\${isMine ? 'text-right' : 'text-left'} flex \${isMine ? 'justify-end' : 'justify-start'}\`}
            >
              <div className={\`max-w-xs px-3 py-2 rounded-xl \${isMine ? 'bg-black text-white' : 'bg-gray-200 text-gray-900'}\`}>
                <p className="text-sm">{m.text}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {m.timestamp?.toDate().toLocaleTimeString()}
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
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
