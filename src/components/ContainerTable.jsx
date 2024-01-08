import React from "react";
import { formatearFecha, formatearHora } from "../helpers/formatearFecha";

export const ContainerTable = ({ data, setModalImagen, setPathImagen }) => {
  return (
    <div className="mt-5 shadow rounded-lg p-5 w-full max-w-full mx-auto overflow-x-auto">
      <h2 className="text-center font-bold">Tus gastos</h2>
      {data?.length === 0 ? (
        <p className="mt-3 text-center font-black text-xl text-gray-400">
          Aún no hay gastos para mostrar, agrega uno nuevo.
        </p>
      ) : (
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className="font-semibold text-sm">Monto S/</th>
              <th className="font-semibold text-sm">Categoria</th>
              <th className="font-semibold text-sm">RUC</th>
              <th className="font-semibold text-sm">Imagen</th>
              <th className="font-semibold text-sm py-3">Fecha</th>
              <th className="font-semibold text-sm">Hora</th>
            </tr>
          </thead>

          <tbody className="">
            {data?.map((e) => (
              <tr key={e.id} className="">
                <td className="text-sm text-center px-3">{e.monto}</td>
                <td className="text-sm text-center px-3">
                  {e.categoria.nombre}
                </td>
                <td className="text-sm text-center px-3">{e.ruc}</td>
                <td className="text-sm text-center px-3">
                  <button
                    className="text-slate-900 font-medium border-b-2 border-black text-xs duration-300 my-2 px-3"
                    onClick={() => {
                      setPathImagen(e.imagen);
                      setModalImagen(true);
                    }}
                  >
                    Ver Imagen
                  </button>
                </td>
                <td className="text-sm text-center py-3">
                  {formatearFecha(e.createdAt)}
                </td>
                <td className="text-sm text-center px-3">
                  {formatearHora(e.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
