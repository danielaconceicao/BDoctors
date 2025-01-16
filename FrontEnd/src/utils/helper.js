// helper.js
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const phoneRegex = /^\+?[0-9]{6,15}$/;
export const ratingRegex = /^[1-5]$/; // prevede un numero da 1 a 5
export const nameRegex = /^[A-Z][a-z, A-Z]{2,}$/; // prevede una stringa composta da soli caratteri alfabetici, che accetta almeno 3 caratteri di cui il primo deve essere maiuscolo.
