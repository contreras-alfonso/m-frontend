import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { LayoutPublico } from "./layouts/LayoutPublico";
import { UserProvider } from "./context/UserProvider";
import { ToastContainer } from "react-toastify";
import { VerificarCuenta } from "./pages/VerificarCuenta";
import { Administracion } from "./pages/Administracion";
import { LayoutPrivado } from "./layouts/LayoutPrivado";
import { GastoProvider } from "./context/GastoProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublico />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "registro",
        element: <Registro />,
      },
      {
        path: "verificar-token/:token",
        element: <VerificarCuenta />,
      },
    ],
  },

  {
    path: "/administracion",
    element: <LayoutPrivado />,
    children: [
      {
        index: true,
        element: <Administracion />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <UserProvider>
      <GastoProvider>
        <RouterProvider router={router} />
      </GastoProvider>
    </UserProvider>
  </>
);
