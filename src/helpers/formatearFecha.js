const formatearFecha = (fecha) => {
  if (fecha?.split("T")) {
    return cambiarFechaAPeru(fecha).split(",")[0];
  }
};

const cambiarFechaAPeru = (date) => {
  const fecha = new Date(date);
  const opciones = {
    timeZone: "America/Lima",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const fechaFormateada = fecha.toLocaleString("es-PE", opciones);
  return fechaFormateada;
};

const formatearHora = (fecha) => {
  if (fecha?.split("T")) {
    return cambiarFechaAPeru(fecha).split(",")[1];
  }
};

export { formatearFecha, formatearHora };
