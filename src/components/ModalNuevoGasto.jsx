import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useImage } from "../hooks/useImage";
import useGasto from "../hooks/useGasto";
import { obtenerCategorias } from "../api/categorias/categorias";
import { esEmail, esNumero } from "../helpers/expresiones";

export const ModalNuevoGasto = ({ modalNuevoGasto, setModalNuevoGasto }) => {
  const { nuevoGasto } = useGasto();

  const [categorias, setCategorias] = useState([]);

  const { selectedImage, onSelectFile } = useImage();

  const [gasto, setGasto] = useState({ monto: "", categoria: "", ruc: "" });

  useEffect(() => {
    const getCategorias = async () => {
      const data = await obtenerCategorias();
      setCategorias(data);
    };
    getCategorias();
  }, []);

  const actGasto = (e) => {
    const copyGasto = { ...gasto, [e.target.name]: e.target.value };
    setGasto(copyGasto);
  };

  const handleRegistroGasto = async (e) => {
    e.preventDefault();

    const { file } = selectedImage;
    const allowedImageMimeTypes = ["image/jpeg", "image/webp", "image/png"];

    if (Object.values(gasto).includes(""))
      return toast.error("Todos los campos son obligatorios.");

    if (!esNumero(gasto.monto))
      return toast.error("El monto debe ser un numero.");
    if (!esNumero(gasto.ruc)) return toast.error("El RUC debe ser un numero.");
    if (gasto.ruc.length !== 11)
      return toast.error("El RUC debe tener 11 numeros.");

    if (!selectedImage)
      return toast.info("Debe seleccionar la imagen del recibo.");

    if (!allowedImageMimeTypes.includes(file.type))
      return toast.info("Seleccione un tipo de imagen correcto.");

    const data = await nuevoGasto(file, gasto);

    if (data.status) {
      toast.success(data.msg);
      setModalNuevoGasto(false);
      return;
    }
    toast.error(data.msg);
  };

  return (
    <>
      <Transition appear show={modalNuevoGasto} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setModalNuevoGasto(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[560px] transform overflow-hidden rounded-lg bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="leading-6 text-gray-900 font-black uppercase text-center"
                  >
                    Nuevo Gasto
                  </Dialog.Title>
                  <form onSubmit={handleRegistroGasto}>
                    <div className="my-7 w-full flex flex-col gap-[10px]">
                      <span className="text-xs uppercase font-semibold">
                        Monto (S/)
                      </span>
                      <input
                        value={gasto.monto}
                        onChange={(e) => {
                          actGasto(e);
                        }}
                        placeholder="Ejm: S/12"
                        name="monto"
                        type="text"
                        className="border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none"
                      />

                      <span className="text-xs uppercase font-semibold">
                        Categoría
                      </span>
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none"
                        name="categoria"
                        onChange={(e) => {
                          actGasto(e);
                        }}
                        value={gasto.categoria}
                        id=""
                      >
                        <option value="">-- Seleccione --</option>
                        {categorias.map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </option>
                        ))}
                      </select>

                      <span className="text-xs uppercase font-semibold">
                        Ruc
                      </span>
                      <input
                        value={gasto.ruc}
                        onChange={(e) => {
                          actGasto(e);
                        }}
                        placeholder="Ejm: 20494100186"
                        name="ruc"
                        className="border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none"
                      />
                      <span className="text-xs uppercase font-semibold">
                        Imagen de recibo
                      </span>
                      <label
                        htmlFor="imagen"
                        className="border-[1px] border-dashed border-gray-300 rounded-lg flex items-center justify-center py-5 cursor-pointer text-sm hover:border-gray-600  duration-300"
                      >
                        Seleccionar imagen
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        name="imagen"
                        id="imagen"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png , image/jpeg, image/webp"
                      />
                      {selectedImage?.id && (
                        <>
                          <p className="text-center italic text-sm">
                            {selectedImage.file.name}
                          </p>

                          <img
                            className="rounded"
                            src={selectedImage.id}
                            alt={selectedImage.id}
                          />
                        </>
                      )}
                    </div>

                    <div className="mt-4 flex items-center">
                      <button
                        type="submit"
                        className="w-full rounded-lg border border-transparent bg-emerald-500 px-4 py-3 text-sm font-medium uppercase text-white hover:bg-emerald-600 duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 tracking-wider"
                      >
                        Agregar gasto
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
