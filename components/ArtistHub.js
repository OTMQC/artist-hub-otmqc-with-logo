import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../public/TYPO ON THE MAP AB.png";
import { ChatBox } from "./ChatBoxFirestore";

export default function ArtistHub({ artistName, onLogout }) {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);

  const handleFormRedirect = () => {
    window.open("https://forms.gle/XVAgU4EnDgboLv7z7", "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("artistName");
    localStorage.removeItem("loginTime");
    router.reload();
  };

  const messages = {
    JULZ: "Yo JULZ, prêt pour le next drop ?",
    Eticrazy: "Connexion établie, Eticrazy ! Prêt à tout déchirer ?",
    "KDS Requinzer": "Bienvenue KDS, on lance ça comme un requin !",
    "d'ose": "Bienvenue D'Ose, prêt à marquer le son ?",
    "Zeke B": "Yo Zeke B, bien en place ? C'est le moment !",
    BbyBlurr: "Let's go BbyBlurr, prêt à flouter les limites ?",
    Lixfe: "Yo Lixfe, en route vers le succès 💽",
    Bedis: "Bienvenue Bedis, go pour le prochain drop !",
  };

  const greeting = messages[artistName] || `Bienvenue ${artistName}, voici ta boîte de discussion avec l’équipe OTMQC.`;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <Image
        src={Logo}
        alt="Logo OnTheMapQc"
        className="mx-auto mb-4"
        width={120}
        height={120}
      />
      <h1 className="text-2xl font-bold mb-2">Portail d'artiste</h1>
      <p className="mb-6 text-gray-700">{greeting}</p>

      <button
        onClick={handleFormRedirect}
        className="bg-black text-white px-6 py-2 rounded mb-4 hover:bg-gray-800"
      >
        Remplir le formulaire
      </button>

      <button
        onClick={() => setShowInfo(!showInfo)}
        className="ml-4 text-xl text-gray-600 hover:text-black"
        aria-label="Informations"
      >
        ?
      </button>

      {showInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-left text-sm shadow">
          <p className="mb-2 font-semibold">À propos du Hub</p>
          <p>
            Ce portail est réservé aux artistes affiliés à OnTheMapQc. Il permet de discuter directement avec l'équipe, de soumettre vos projets via le formulaire de pitch, et de suivre vos interactions.
          </p>
          <p className="mt-2">
            Le <strong>formulaire de pitch</strong> est utilisé pour proposer vos sorties musicales (single, EP, album) à distribuer sur toutes les plateformes. Il est essentiel de remplir toutes les sections avec soin pour une diffusion optimale.
          </p>
        </div>
      )}

      <div className="mt-6">
        <ChatBox artist={artistName} />
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-gray-500 mt-6 hover:underline"
      >
        Se déconnecter
      </button>

      <p className="mt-2">
        <a href="mailto:julien@onthemapqc.com,guillaume@onthemapqc.com" className="text-blue-600 text-sm hover:underline">
          Contacter l'équipe
        </a>
      </p>

      <div className="flex justify-center py-6">
        <a
          href="https://www.instagram.com/onthemapqc/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#E1306C] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#c22d61] transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="white">
            <path d="M224,202.66A53.34,53.34,0,1,0,277.34,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.81-30.81C294.08,122.51,224,122.51,224,122.51s-70.08,0-93.9,8.38a54,54,0,0,0-30.81,30.81C91.91,146.49,91.91,192,91.91,192s0,70.08,8.38,93.9a54,54,0,0,0,30.81,30.81C153.92,326.49,224,326.49,224,326.49s70.08,0,93.9-8.38a54,54,0,0,0,30.81-30.81c8.38-23.82,8.38-93.9,8.38-93.9S357.09,146.49,348.71,161.63ZM224,288a32,32,0,1,1,32-32A32,32,0,0,1,224,288Zm88-120a12,12,0,1,1,12-12A12,12,0,0,1,312,168Zm76-88V432a56,56,0,0,1-56,56H116a56,56,0,0,1-56-56V80A56,56,0,0,1,116,24H332A56,56,0,0,1,388,80Z" />
          </svg>
          Suivez-nous sur Instagram
        </a>
      </div>
    </div>
  );
}
