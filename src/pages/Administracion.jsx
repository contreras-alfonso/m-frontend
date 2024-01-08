import React, { useState } from "react";
import { ModalNuevoGasto } from "../components/ModalNuevoGasto";
import useGasto from "../hooks/useGasto";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { ModalImagen } from "../components/ModalImagen";
import { ContainerTable } from "../components/ContainerTable";

export const Administracion = () => {
  const navigate = useNavigate();

  const [modalNuevoGasto, setModalNuevoGasto] = useState(false);
  const [modalImagen, setModalImagen] = useState(false);
  const [pathImagen, setPathImagen] = useState("");

  const { user } = useUser();
  const { gastos } = useGasto();

  const cerrarSesion = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };


  return (
    <main className="h-screen overflow-y-auto bg-color-bg p-5">
      <div className="bg-white shadow py-3 px-5 flex flex-row max-lg:flex-col max-lg:gap-3 justify-between items-center rounded-lg gap-3">
        <p className="flex-1">
          Bienvenido, <span className="font-medium">{user.nombre}</span>
        </p>

        <button
          onClick={() => {
            setModalNuevoGasto(true);
          }}
          className="bg-emerald-500 rounded-lg py-3 px-5 text-white text-sm hover:bg-emerald-600 duration-300 max-lg:w-full"
        >
          Nuevo Gasto +
        </button>

        <div className="flex-1 w-full mx-auto flex items-end justify-end">
          <button
            onClick={cerrarSesion}
            className="bg-slate-800 rounded-lg py-3 px-5 text-white text-sm hover:bg-slate-900 duration-300 max-lg:w-full"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

    
      <ContainerTable
        data={gastos}
        pathImagen={pathImagen}
        setPathImagen={setPathImagen}
        modalImagen={modalImagen}
        setModalImagen={setModalImagen}
      />

      {modalImagen && (
        <ModalImagen
          pathImagen={pathImagen}
          modalImagen={modalImagen}
          setModalImagen={setModalImagen}
        />
      )}

      {modalNuevoGasto && (
        <ModalNuevoGasto
          modalNuevoGasto={modalNuevoGasto}
          setModalNuevoGasto={setModalNuevoGasto}
        />
      )}
    </main>
  );
};
