import { useState } from "react";
import AdminChatDashboard from "../components/AdminChatDashboard";

export default function AdminPage() {
  const [verified, setVerified] = useState(true);
  return (
    <div className="min-h-screen px-4 py-8 sm:px-12 max-w-screen-md mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">🔐 Portail Administrateur OTMQC</h1>
      {!verified ? (
        <div className="text-center">Connexion Admin en construction</div>
      ) : (
        <div className="space-y-6 text-left">
          <p className="text-gray-600">Bienvenue dans votre interface. Voici les modules actifs :</p>
          <ul className="list-disc list-inside text-gray-800">
            <li>💬 Accès aux conversations avec les artistes</li>
          </ul>
          <AdminChatDashboard />
        </div>
      )}
    </div>
  );
}
