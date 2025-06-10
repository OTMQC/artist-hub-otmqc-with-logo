import React from "react";
import ArtistNavTabs from "../../components/ArtistNavTabs";
import { ChatBox } from "../../components/ChatBoxFirestore";

export default function Messagerie() {
  const artist = typeof window !== "undefined"
    ? localStorage.getItem("current-artist")
    : null;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <ArtistNavTabs activeTab="messagerie" />
      <h1 className="text-2xl font-bold mb-4">Messagerie</h1>
      <p className="mb-6 text-gray-700">
        Discutez directement avec l'équipe OTMQC via la messagerie ci-dessous.
      </p>
      {artist && <ChatBox artist={artist} />}
    </div>
  );
}
