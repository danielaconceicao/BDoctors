const db = require('../database/db')


// helper.js
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneRegex = /^\+?[0-9]{6,15}$/
const ratingRegex = /^[1-5]$/; // prevede un numero da 1 a 5
const nameRegex = /^[A-Z][a-z, A-Z]{2,}$/; // prevede una stringa composta da soli caratteri alfabetici, che accetta almeno 3 caratteri di cui il primo deve essere maiuscolo.
function verifyDoctorId(id, req, res) {
    db.query("SELECT * FROM doctors WHERE ID=?", [id], (err, result) => {
        if (result.length === 0) {
            return res.status(404).json({ message: 'Dottore non trovato!' });
        }
    })
}


module.exports = {
    emailRegex,
    phoneRegex,
    ratingRegex,
    nameRegex,
    verifyDoctorId,


};
