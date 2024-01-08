import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import { esEmail } from "../helpers/expresiones";

export const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { registro } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, user, password].includes("")) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (!esEmail(user)) return toast.error("Ingrese un email válido.");

    const data = await registro({ nombre, email: user, password });

    if (!data.status) {
      toast.error(data.msg);
      return;
    }
    setNombre("");
    setUser("");
    setPassword("");
    toast.success(data.msg);
  };

  return (
    <div
      className="h-screen flex items-center justify-center 
    fondo_svg"
    >
      <div className="bg-white w-[520px] mx-5  rounded-lg shadow-lg h-fit flex items-center justify-center border-[1px] border-gray-100">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-5 px-10 py-16 max-lg:w-full"
          action=""
        >
          <div className="space-y-2">
            <h1 className="font-bold text-3xl text-center">Sign Up</h1>
          </div>

          <div className="my-3 flex items-center">
            <hr className="border-[1px] border-gray-100 w-1/3" />
            <p className="w-1/3 text-center text-gray-400 text-xs">
              With email
            </p>
            <hr className="border-[1px] border-gray-100 w-1/3" />
          </div>

          <div className="flex flex-col gap-5">
            <input
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              type="text"
              placeholder="Nombre"
              className="border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none"
            />
            <input
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
              type="text"
              placeholder="Email"
              className="border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none"
            />
          </div>
          <Link
            to={"/"}
            className="text-end text-emerald-500 text-xs cursor-pointer hover:text-emerald-600"
          >
            Prefiero iniciar sesión.
          </Link>
          <button
            type="submit"
            className="bg-emerald-500 text-white rounded-lg py-3 text-sm text-center hover:bg-emerald-600 duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
