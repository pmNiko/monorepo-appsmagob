export const capitalizeWords = (str: string) => {
  // Dividir la cadena en palabras
  const words = str.split(" ");

  // Mapear cada palabra para capitalizarla
  const capitalizedWords = words.map((word) => {
    // Convertir la primera letra en mayúscula y el resto en minúscula
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Unir las palabras en una sola cadena
  return capitalizedWords.join(" ");
};
