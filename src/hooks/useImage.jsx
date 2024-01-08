import React, { useState } from 'react';

export const useImage = () => {
  const [selectedImage, setSelectedImage] = useState();

  const onSelectFile = (event) => {

    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setSelectedImage({
        id: imageURL, // Utiliza la URL de objeto como identificador único
        file: selectedFile,
      });
    }
  };


  return {
    selectedImage,
    onSelectFile,
  };
};
