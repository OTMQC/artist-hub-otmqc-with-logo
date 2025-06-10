
import Link from "next/link";

export default function ArtistNavTabs({ activeTab }) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <Link href="/distribution">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "distribution" ? "bg-black text-white" : "bg-gray-200 text-black"
          }`}
        >
          Distribution
        </button>
      </Link>
      <Link href="/chat">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "chat" ? "bg-black text-white" : "bg-gray-200 text-black"
          }`}
        >
          Chat
        </button>
      </Link>
    </div>
  );
}

