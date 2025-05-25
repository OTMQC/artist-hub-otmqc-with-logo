
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import fr from 'date-fns/locale/fr';
import Logo from "../public/TYPO ON THE MAP AB.png";

export default function ArtistHub() {
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const welcomeMessages = {
    "Eticrazy": "Bonjour Eticrazy, prêt pour le next drop ?",
    "JULZ": "Bonjour JULZ, prêt pour le next drop ?",
    "KDS Requinzer": "Bonjour KDS Requinzer, prêt pour le next drop ?",
    "d'ose": "Bonjour d'ose, prêt pour le next drop ?",
    "Zeke B": "Bonjour Zeke B, prêt pour le next drop ?",
    "BbyBlurr": "Bonjour BbyBlurr, prêt pour le next drop ?",
    "Lixfe": "Bonjour Lixfe, prêt pour le next drop ?",
    "Bedis": "Bonjour Bedis, prêt pour le next drop ?"
  };

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

    if (artistName.trim().toLowerCase() === "admin" && password.trim() === "admin-otmqc-2025$") {
      localStorage.setItem("current-artist", artistName);
      router.push("/admin");
      return;
    }

    const artistMatch = validArtists.includes(artistName.trim());
    const passwordMatch = password.trim() === "distrib-otmqc-2025!";

    if (artistMatch && passwordMatch) {
      recordLogin(artistName);
      localStorage.setItem("current-artist", artistName);
      router.push("/chat");
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

  const recordLogin = (name) => {
    const now = new Date().toISOString();
    const logins = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("artist-logins") || "[]") : [];
    const updated = [{ name, date: now }, ...logins.filter(l => l.name !== name)];
    localStorage.setItem("artist-logins", JSON.stringify(updated.slice(0, 10)));
  };

  const Header = () => (
    <div className="mb-8 text-center">
      <Image src={Logo} alt="OnTheMapQc Logo" width={200} height={100} className="mx-auto object-contain" />
    </div>
  );

  const mailtoLink =
    "mailto:julien@onthemapqc.com,guillaume@onthemapqc.com" +
    "?subject=Demande%20de%20support%20-%20Hub%20OnTheMapQc" +
    "&body=Bonjour%20l'équipe%20OnTheMapQc,%0D%0A%0D%0AJe%20souhaite%20obtenir%20de%20l'aide%20concernant%20l'accès%20au%20formulaire.%0D%0A%0D%0A---%0D%0ANom%20:%0D%0A%20Numéro%20de%20téléphone%20:%0D%0A%20Problème%20rencontré%20:%0D%0A---%0D%0AMerci%20d'avance.%0D%0A";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center px-4 py-12">
      <Header />
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl px-6 sm:px-10 py-10 sm:py-12 animate-fade-in text-center border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Portail d'artiste</h1>
        <p className="text-gray-600 mb-6 text-base">
          Ce formulaire est réservé aux artistes affiliés à OnTheMapQc.
          Entrez votre nom d'artiste et le mot de passe pour y accéder.
        </p>
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Nom d'artiste"
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-black pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {lockedUntil && timeLeft > 0 && (
          <p className="text-sm text-orange-600 mb-2">
            🔒 Accès verrouillé – temps restant : {Math.floor(timeLeft / 60)} min {timeLeft % 60}s
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-900 transition-all duration-200"
        >
          Accéder
        </button>
        <a
          href={mailtoLink}
          className="mt-4 text-sm text-blue-600 underline block hover:text-blue-800"
        >
          Contacter l'équipe
        </a>
      </div>
    </div>
  );
}
