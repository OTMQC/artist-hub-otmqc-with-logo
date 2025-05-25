
import { useState, useEffect } from "react";
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
    <div className="border rounded-xl p-4 w-full max-w-md mx-auto mt-6">
      <h2 className="font-bold mb-2">💬 Discussion avec l’équipe OTMQC</h2>
      <div className="h-48 overflow-y-auto bg-gray-100 p-2 text-left text-sm mb-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">
            <strong>{m.from}:</strong> {m.text}
            <span className="text-gray-400 text-xs"> ({m.timestamp?.toDate().toLocaleTimeString()})</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Écris ton message..."
        />
        <button onClick={sendMessage} className="bg-black text-white px-3 rounded">
          Envoyer
        </button>
      </div>
    </div>
  );
}
