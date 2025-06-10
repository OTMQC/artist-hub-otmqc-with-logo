
import { db } from "../components/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase";
import ChatBoxFirestore from "../components/ChatBoxFirestore";
import { useRouter } from "next/router";
import ArtistNavTabs from "../components/ArtistNavTabs";

const greetings = {
  "Eticrazy": "Bonjour Eticrazy, prêt pour le next drop ?",
  "JULZ": "Bonjour JULZ, prêt pour le next drop ?",
  "KDS Requinzer": "Bonjour KDS Requinzer, prêt pour le next drop ?",
  "d'ose": "Bonjour d'ose, prêt pour le next drop ?",
  "Zeke B": "Bonjour Zeke B, prêt pour le next drop ?",
  "BbyBlurr": "Bonjour BbyBlurr, prêt pour le next drop ?",
  "Lixfe": "Bonjour Lixfe, prêt pour le next drop ?",
  "Disbe": "Bonjour Disbe, prêt pour le next drop !",
  "66VET": "Bonjour 66VET, prêt pour le next drop ?"
};

export default function ChatPage() {
  const [artistName, setArtistName] = useState(null);
  const [lastSeen, setLastSeen] = useState([]);
  const router = useRouter();
  const greetingMessage = greetings[artistName] || `Bienvenue ${artistName}, voici ta boîte de discussion avec l’équipe OTMQC.`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("current-artist");
    if (stored) {
      setArtistName(displayName.toUpperCase());
    } else {
      router.push("/");
    }

    const raw = localStorage.getItem("artist-logins");
    if (raw) {
      const recent = JSON.parse(raw).slice(0, 2);
      setLastSeen(recent);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("current-artist");
    router.push("/");
  };

  if (!artistName || artistName === "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-600 font-bold">
        Accès non autorisé à cette page.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-10 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🎤 Portail d'artiste OTMQC</h1>
      <ArtistNavTabs active="chat" />
      <p className="text-gray-600 mb-6">
        {greetingMessage}
      </p>

      <ChatBox artist={artistName} />

      <div className="mt-6 text-sm text-gray-600">
        {lastSeen.length > 0 && (
          <>
            <p className="mb-1">📡 Dernières connexions d’artistes :</p>
            <ul className="space-y-1">
              {lastSeen.map((entry, i) => (
                <li key={i}>🟢 {entry.name} était actif {formatTimeAgo(entry.date)}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Se déconnecter
        </button>
        <a
          href="mailto:julien@onthemapqc.com,guillaume@onthemapqc.com?subject=Demande%20de%20support%20Hub%20OTMQC"
          className="block text-sm text-blue-600 underline"
        >
          Contacter l'équipe
        </a>
      </div>
    </div>
  );
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "à l’instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `il y a ${hours}h`;
}
