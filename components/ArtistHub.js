import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../public/TYPO ON THE MAP AB.png";

export default function ArtistHub() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const validArtists = [
    "Eticrazy",
    "JULZ",
    "KDS Requinzer",
    "d'ose",
    "Zeke B",
    "BbyBlurr",
    "Lixfe",
    "Bedis"
  ];

  useEffect(() => {
    const storedLock = localStorage.getItem("otmqc-locked-until");
    if (storedLock) {
      const lockDate = new Date(storedLock);
      setLockedUntil(lockDate);
      updateTimeLeft(lockDate);
    }
  }, []);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      updateTimeLeft(lockedUntil);
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const updateTimeLeft = (lockDate) => {
    const now = new Date();
    const diff = Math.max(0, lockDate - now);
    setTimeLeft(Math.floor(diff / 1000));
    if (diff <= 0) {
      setLockedUntil(null);
      localStorage.removeItem("otmqc-locked-until");
    }
  };

  const handleSubmit = () => {
    const now = new Date();
    if (lockedUntil && now < new Date(lockedUntil)) {
      setError("Trop de tentatives. Réessayez après 15 minutes.");
      return;
    }

    const artistMatch = validArtists.includes(artistName.trim());
    const passwordMatch = password.trim() === "distrib-otmqc-2025!";

    if (artistMatch && passwordMatch) {
      setAccessGranted(true);
      setError("");
      setLoginAttempts(0);
      localStorage.removeItem("otmqc-locked-until");
    } else {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);

      if (attempts >= 3) {
        const lockTime = new Date(Date.now() + 15 * 60 * 1000);
        setLockedUntil(lockTime);
        localStorage.setItem("otmqc-locked-until", lockTime.toISOString());
        updateTimeLeft(lockTime);
        sendSecurityAlert();
        setError("Trop de tentatives. Accès verrouillé pendant 15 minutes.");
      } else {
        setError("Nom d'artiste ou mot de passe incorrect. Veuillez réessayer.");
      }
    }
  };

  const sendSecurityAlert = () => {
    fetch("https://formspree.io/f/mnqevpda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "🔐 Tentatives échouées - Hub OTMQC",
        message: "Une adresse a tenté de se connecter 3 fois sans succès. Accès verrouillé pendant 15 minutes.",
        to: "julien@onthemapqc.com, guillaume@onthemapqc.com, felix@onthemapqc.com"
      })
    });
  };

  const handleLogout = () => {
    setAccessGranted(false);
    setArtistName("");
    setPassword("");
    setError("");
    setLoginAttempts(0);
    localStorage.removeItem("otmqc-locked-until");
  };

  const Header = () => (
    <div className="mb-8">
      <Image src={Logo} alt="OnTheMapQc Logo" width={300} height={100} />
    </div>
  );

  const mailtoLink =
    "mailto:julien@onthemapqc.com,guillaume@onthemapqc.com" +
    "?subject=Demande%20de%20support%20-%20Hub%20OnTheMapQc" +
    "&body=Bonjour%20l'équipe%20OnTheMapQc,%0D%0A%0D%0AJe%20souhaite%20obtenir%20de%20l'aide%20concernant%20l'accès%20au%20formulaire.%0D%0A%0D%0A---%0D%0ANom%20:%0D%0A%20Numéro%20de%20téléphone%20:%0D%0A%20Problème%20rencontré%20:%0D%0A---%0D%0AMerci%20d'avance.%0D%0A";

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-12">
        <Header />
        <h1 className="text-4xl font-bold mb-6">🎤 Accès au formulaire – OnTheMapQc</h1>
        <p className="text-lg mb-4 max-w-xl">
          Ce formulaire est réservé aux artistes affiliés à OnTheMapQc.
          Entrez votre nom d'artiste et le mot de passe pour y accéder.
        </p>
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Nom d'artiste"
          className="border px-4 py-2 rounded mb-2 w-64 text-center"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="border px-4 py-2 rounded mb-2 w-64 text-center"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {lockedUntil && timeLeft > 0 && (
          <p className="text-sm text-orange-600 mb-2">
            🔒 Accès verrouillé – temps restant : {Math.floor(timeLeft / 60)} min {timeLeft % 60}s
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Accéder
        </button>
        <a
          href={mailtoLink}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Contacter l'équipe
        </a>
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
        className="text-sm text-gray-500 underline hover:text-black mb-2"
      >
        Se déconnecter
      </button>
      <a
        href={mailtoLink}
        className="text-sm text-blue-600 underline"
      >
        Contacter l'équipe
      </a>
    </div>
  );
}
