const esNumero = (valor) => /^\d+(\.\d+)?$/.test(valor);

const esEmail = (valor) => {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresionRegular.test(valor);
};

export { esNumero, esEmail };
