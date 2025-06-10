
import React from "react";
import ArtistNavTabs from '../components/ArtistNavTabs';

export default function Distribution() {
  const handleFormRedirect = () => {
    window.open("https://forms.gle/XVAgU4EnDgboLv7z7", "_blank");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-10 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🎤 Portail d'artiste</h1>
      <ArtistNavTabs active="distribution" />

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

