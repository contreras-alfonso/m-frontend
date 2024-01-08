import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export const LayoutPrivado = () => {
  const { user, setUser, cargando, verificarLogin } = useUser();

  useEffect(() => {
    const verificar = async () => {
      const data = await verificarLogin();
      setUser(data);
    };
    verificar();
  }, []);

  if (cargando) {
    return (
      <>
        <div className="bg-color-bg h-screen flex"></div>
      </>
    );
  }

  return <>{user?.id ? <Outlet /> : <Navigate to={"/"}></Navigate>}</>;
};
