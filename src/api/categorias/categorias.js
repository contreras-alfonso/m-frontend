const obtenerCategorias = async () => {

    const url = `${import.meta.env.VITE_RUTA_BACKEND_CATEGORIAS}/getAll`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'Application/json',
        },
    });
    
    return await response.json();
    
}

export {
    obtenerCategorias
}