
import React, { useEffect, useState } from "react";
import ArtistNavTabs from '../components/ArtistNavTabs';
import { onAuthStateChanged, getAuth } from "firebase/auth";

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

export default function Distribution() {
  const [artistName, setArtistName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName || "";
        setArtistName(displayName);
        setGreetingMessage(greetings[displayName] || `Bienvenue ${displayName}, voici ton portail de distribution.`);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFormRedirect = () => {
    window.open("https://forms.gle/XVAgU4EnDgboLv7z7", "_blank");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-10 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🎤 Portail d'artiste OTMQC</h1>
      <ArtistNavTabs active="distribution" />

      <p className="text-gray-600 mb-6">{greetingMessage}</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Formulaire de distribution</h2>
      <p className="mb-6 text-gray-700">
        Remplissez le formulaire pour soumettre votre musique à l'équipe OTMQC.
      </p>
      <button
        onClick={handleFormRedirect}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Remplir le formulaire
      </button>
    </div>
  );
}


