
import { useState } from "react";
import AdminChatDashboard from "../components/AdminChatDashboard";
import { useRouter } from "next/router";

export default function AdminPage() {
  const [verified, setVerified] = useState(true);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("current-artist");
    router.push("/");
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-12 max-w-screen-md mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">🔐 Portail Administrateur OTMQC</h1>
      <p className="text-center text-sm text-gray-600 mb-4">Bienvenue dans votre interface d’administration.</p>
      <AdminChatDashboard />
      <div className="mt-8 text-center space-y-3">
        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Se déconnecter
        </button>
        <a
          href="mailto:julien@onthemapqc.com,guillaume@onthemapqc.com?subject=Assistance%20Admin%20Hub%20OTMQC"
          className="block text-sm text-blue-600 underline"
        >
          Contacter l'équipe
        </a>
      </div>
    </div>
  );
}
