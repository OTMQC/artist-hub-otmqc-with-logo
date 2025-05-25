
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
    <div className="w-full max-w-xl mx-auto mt-8 p-4 border rounded-xl bg-white shadow">
      <h2 className="text-lg font-bold mb-3">💬 Discussion avec l’équipe OTMQC</h2>
      <div className="h-64 overflow-y-auto bg-gray-50 p-3 rounded border text-sm mb-4">
        {messages.length === 0 && (
          <p className="text-gray-400 italic">Aucun message encore. Commence la conversation !</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <strong>{m.from}</strong>: {m.text}
            <span className="text-gray-400 text-xs ml-2">
              {m.timestamp?.toDate().toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
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
