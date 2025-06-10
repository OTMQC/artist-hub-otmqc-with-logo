
import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export function ChatBox({ artist }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const artistId = artist.trim().toUpperCase();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsub = onSnapshot(q, (snapshot) => {
      const loaded = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const from = data.from?.trim().toUpperCase();
        const to = data.to?.trim().toUpperCase();
        const isArtistChat = (
          (from === artistId && to === "ADMIN") ||
          (from === "ADMIN" && to === artistId)
        );
        if (isArtistChat) {
          loaded.push(data);
        }
      });
      setMessages(loaded);
    });

    return () => unsub();
  }, [artistId]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    await addDoc(collection(db, "messages"), {
      from: artistId,
      to: "ADMIN",
      text: trimmed,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="border p-4 rounded-xl bg-white shadow-sm">
      <h2 className="text-left font-semibold mb-3 text-lg">💬 Messagerie</h2>
      <div className="bg-gray-100 h-64 overflow-y-auto px-3 py-2 mb-4 rounded-md">
        {messages.length === 0 && (
          <p className="text-sm text-gray-400">Aucun message pour le moment.</p>
        )}
        {messages.map((m, i) => {
          const isMine = m.from === artistId;
          return (
            <div
              key={i}
              className={(isMine ? "text-right" : "text-left") + " flex " + (isMine ? "justify-end" : "justify-start") + " mb-2"}
            >
              <div className={(isMine ? "bg-black text-white" : "bg-gray-200 text-gray-900") + " max-w-xs px-3 py-2 rounded-xl"}>
                <p className="text-sm">{m.text}</p>
                {m.timestamp?.toDate && (
                  <p className="text-xs mt-1 text-gray-400">
                    {m.timestamp.toDate().toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écris ton message ici..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
