import React, { useState } from "react";
import Image from "next/image";
import Logo from "../public/TYPO ON THE MAP AB.png";

export default function ArtistHub() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password.trim() === "distrib-otmqc-2025!") {
      setAccessGranted(true);
      setError("");
    } else {
      setError("Mot de passe incorrect. Veuillez réessayer.");
    }
  };

  const handleLogout = () => {
    setAccessGranted(false);
    setPassword("");
    setError("");
  };

  const Header = () => (
    <div className="mb-8">
      <Image src={Logo} alt="OnTheMapQc Logo" width={300} height={100} />
    </div>
  );

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-12">
        <Header />
        <h1 className="text-4xl font-bold mb-6">🎤 Accès au formulaire – OnTheMapQc</h1>
        <p className="text-lg mb-4 max-w-xl">
          Ce formulaire est réservé aux artistes affiliés à OnTheMapQc.
          Entrez le mot de passe pour y accéder.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="border px-4 py-2 rounded mb-2 w-64 text-center"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Accéder
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-12">
      <Header />
      <h1 className="text-4xl font-bold mb-6">🎤 Formulaire de distribution – OnTheMapQc</h1>
      <p className="text-lg mb-4 max-w-xl">
        Merci de faire confiance à OnTheMapQc pour distribuer ta musique.
        Clique sur le bouton ci-dessous pour accéder au formulaire à remplir.
      </p>
      <a
        href="https://forms.gle/XVAgU4EnDgboLv7z7"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white px-6 py-3 rounded text-lg hover:bg-gray-800 transition mb-4"
      >
        Remplir le formulaire
      </a>
      <button
        onClick={handleLogout}
        className="text-sm text-gray-500 underline hover:text-black"
      >
        Se déconnecter
      </button>
    </div>
  );
}