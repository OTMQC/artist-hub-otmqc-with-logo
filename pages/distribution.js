
import React from "react";
import ArtistNavTabs from "../../components/ArtistNavTabs";

export default function Distribution() {
  const handleFormRedirect = () => {
    window.open("https://forms.gle/XVAgU4EnDgboLv7z7", "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      {/* Barre de navigation entre Chat et Distribution */}
      <ArtistNavTabs activeTab="distribution" />

      <h1 className="text-2xl font-bold mb-4">Formulaire de distribution</h1>
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
