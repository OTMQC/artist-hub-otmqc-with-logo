import Link from "next/link";

export default function ArtistNavTabs({ activeTab }) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <Link href="/hub/distribution">
        <button className={`px-4 py-2 rounded ${activeTab === "distribution" ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
          Distribution
        </button>
      </Link>
      <Link href="/hub/messagerie">
        <button className={`px-4 py-2 rounded ${activeTab === "messagerie" ? "bg-black text-white" : "bg-gray-200 text-black"}`}>
          Messagerie
        </button>
      </Link>
    </div>
  );
}
