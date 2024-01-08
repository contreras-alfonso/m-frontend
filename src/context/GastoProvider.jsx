import React, { createContext, useEffect, useState } from "react";
import { formatearFecha } from "../helpers/formatearFecha";

const GastoContext = createContext();

const GastoProvider = ({ children }) => {
  const [gastos, setGastos] = useState();

  useEffect(() => {
    const obtenerGastosUsuario = async () => {
      const url = `${import.meta.env.VITE_RUTA_BACKEND_GASTOS}/getAll`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "Application/json",
        },
      });
      const data = await response.json();
    
      setGastos(data);
    };
    obtenerGastosUsuario();
  }, []);

  const agregarGastoState = (data) => {
    const copyGastos = [...gastos];

    const objetoNuevoGasto = {
        id: data.gasto.id,
        monto: data.gasto.monto,
        ruc: data.gasto.ruc,
        imagen: data.gasto.imagen,
        createdAt: data.gasto.createdAt,
        categoria: {
            nombre: data.categoria.nombre
        }
    }

    copyGastos.unshift(objetoNuevoGasto);
    setGastos(copyGastos)
  }

  const nuevoGasto = async (file, gasto) => {
    const formData = new FormData();
    formData.append("imagen", file);
    formData.append("monto", gasto.monto);
    formData.append("categoria", gasto.categoria);
    formData.append("ruc", gasto.ruc);

    const response = await fetch(
      `${import.meta.env.VITE_RUTA_BACKEND_GASTOS}/nuevo-gasto`,
      {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        method: "POST",
        body: formData,
        
      }
    );

    const data = await response.json();

    agregarGastoState(data);

    return data;
  };

  return (
    <GastoContext.Provider
      value={{
        gastos,
        nuevoGasto,
      }}
    >
      {children}
    </GastoContext.Provider>
  );
};

export { GastoProvider };
export default GastoContext;
