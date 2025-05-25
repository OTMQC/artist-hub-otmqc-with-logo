import { useState, useEffect } from "react";
import { ChatBox } from "../components/ChatBoxFirestore";

export default function ChatPage() {
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("current-artist");
    if (stored) setArtistName(stored);
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 sm:px-12 max-w-screen-sm mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">💬 Messagerie OTMQC</h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Accède à ta boîte de discussion directe avec l’équipe OTMQC
      </p>
      {artistName ? (
        <ChatBox artist={artistName} />
      ) : (
        <p className="text-center text-gray-400">Aucun artiste connecté</p>
      )}
    </div>
  );
}
