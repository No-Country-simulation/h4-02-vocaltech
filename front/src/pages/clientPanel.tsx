import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { IUser } from "../types/User";
import Calendar from "../components/Dashboard/Calendar";

const ClientPanel: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");
      console.log(userId);

      if (!userId) {
        setError("No se encontró el ID del usuario en localStorage.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `https://h4-02-vocaltech.onrender.com/api/user/${userId}`
        );
        if (!response.ok) throw new Error("Error al obtener los datos");

        const data: IUser = await response.json();
        setUser(data.user);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-primary_400 w-2/3 rounded-lg p-6 text-blanco_300 my-10 m-auto md:ml-10 lg:w-1/3">
        <h2 className="font-bold text-xl mb-3">Panel del Cliente</h2>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {user && (
          <div>
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>
            <p>
              <strong>Empresa:</strong> {user.company}
            </p>
          </div>
        )}
      </div>
      <div className="m-6">
        <h2 className="text-primary_400 text-3xl ml-4 mb-10">Agendar Reunión</h2>
        {user && <Calendar userId={user.id} />}
      </div>
      <Footer />
    </div>
  );
};

export default ClientPanel;
