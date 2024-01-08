import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";

export const VerificarCuenta = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const { token } = useParams();
  const { verificarCuenta } = useUser();

  useEffect(() => {
    const confirmarCuenta = async () => {
      setCargando(true);
      const data = await verificarCuenta(token);
      setCargando(false);
      if (!data.status) {
        navigate("/");
      }
    };

    confirmarCuenta();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {cargando ? (
        <p className="bg-black py-5 px-10 rounded-lg text-white">
          Un momento, verificando token...
        </p>
      ) : (
        <p className="bg-emerald-500 py-5 px-10 rounded-lg text-white">
          Cuenta verificada con éxito.{" "}
          <Link
            className="text-white font-black border-b-2 hover:text-white/80"
            to={"/"}
          >
            Iniciar Sesión
          </Link>
        </p>
      )}
    </div>
  );
};
