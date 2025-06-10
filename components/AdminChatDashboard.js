
import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export default function AdminChatDashboard() {
  const [messagesByRoom, setMessagesByRoom] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [response, setResponse] = useState("");
  const [authStep, setAuthStep] = useState("code");
  const [codeInput, setCodeInput] = useState("");
  const [verified, setVerified] = useState(false);

  const expectedCode = "4321";

  useEffect(() => {
    if (!verified) return;
    const rooms = ["Eticrazy", "JULZ", "KDS Requinzer", "d'ose", "Zeke B", "BbyBlurr", "Lixfe", "Disbe", "66VET"];
    const unsubscribers = rooms.map((artist) => {
      const roomName = `admin-${artist.trim().toUpperCase()}`;
      const q = query(collection(db, "messages", roomName, "chats"), orderBy("timestamp"));

      return onSnapshot(q, (snapshot) => {
        setMessagesByRoom((prev) => ({
          ...prev,
          [roomName]: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        }));
      });
    });

    return () => unsubscribers.forEach(unsub => unsub());
  }, [verified]);

  const sendReply = async () => {
    if (!response.trim() || !selectedRoom) return;
    const messagesRef = collection(db, "messages", selectedRoom, "chats");
    await addDoc(messagesRef, {
      from: "admin",
      tmessage: response.trim(),
      room: roomName,
      timestamp: serverTimestamp()
    });
    setResponse("");
  };

  const handleCodeSubmit = () => {
    if (codeInput === expectedCode) {
      setVerified(true);
      setAuthStep("granted");
    } else {
      alert("Code incorrect");
    }
  };

  if (!verified) {
    return (
      <div className="max-w-sm mx-auto mt-12 border p-6 rounded-xl text-center">
        <h2 className="text-xl font-semibold mb-4">🔐 Vérification d'identité</h2>
        <p className="mb-2 text-sm text-gray-600">Entrez le code de sécurité à 4 chiffres</p>
        <input
          type="text"
          maxLength={4}
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          className="border px-3 py-2 rounded text-center tracking-widest text-lg"
        />
        <button
          onClick={handleCodeSubmit}
          className="block bg-black text-white px-6 py-2 mt-4 rounded"
        >
          Valider
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 border rounded-xl p-4">
      <h2 className="text-lg font-bold mb-4">📬 Messagerie Admin</h2>
      <div className="flex gap-4 mb-4">
        <select
          value={selectedRoom || ""}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="border p-2 rounded"
        >
          {Object.keys(messagesByRoom).map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <div className="bg-gray-100 p-3 h-48 overflow-y-auto rounded text-sm">
        {(messagesByRoom[selectedRoom?.trim().toUpperCase()] || []).map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.message}
            <span className="text-gray-400 text-xs ml-2">
              {msg.timestamp?.toDate().toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-3">
        <input
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Répondre à l’artiste..."
        />
        <button
          onClick={sendReply}
          className="bg-black text-white px-4 rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
