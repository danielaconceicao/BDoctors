const db = require('../database/db')
const { verifyDoctorId, ratingRegex, nameRegex } = require('../utils/helper.js');

// recupera tutte le recensioni presenti nel data base
const getReviews = function (req, res) {

    db.query('SELECT * FROM reviews', function (err, results) {
        if (err) {
            console.error('Errore nel recupero delle recensioni', err)
        } else if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Recensione non trovata' });
        } else {
            res.json(results)
        }
    })
}

// aggiungi una recensione al database
const postReview = function (req, res) {
    const { first_name, last_name, description, rating, doctor_id } = req.body



    if (!first_name || !last_name || !description || !rating || !doctor_id) {
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori' })
    }


    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
        return res.status(401).json({ error: 'Il campo prevede una parola composta da soli caratteri alfabetici, lunga almeno 3 caratteri di cui il primo deve essere maiuscolo.' });
    }

    if (!ratingRegex.test(rating)) {
        return res.status(401).json({ error: 'Il voto deve essere un carattere da 1 a 5' })
    }

    // verifica che il dottore associato alla recensione sia presente nel database
    verifyDoctorId(doctor_id, req, res)

    const sql = 'INSERT INTO reviews (first_name, last_name, description, rating, doctor_id) VALUES (?,?,?,?,?)'

    db.query(sql, [first_name, last_name, description, rating, doctor_id], function (err) {
        if (err) {
            console.error('Errore nel salvataggio della recensione', err)
        } else {
            res.status(200).json({ message: 'Recensione salvata con successo' })
        }
    })
}

// recupera una recensione specifica per ID
const getReviewById = function (req, res) {
    const id = req.params

    const sql = 'SELECT * FROM reviews WHERE ID = ?'


    db.query(sql, [id], function (err, results) {
        if (err) {
            console.error('Errore nel recupero della recensione', id, err)
        } else if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Recensione non trovata' });
        } else {
            res.json(results)
        }
    })
}

// cancella una recensione specifica per ID
const deleteReviewById = function (req, res) {
    const id = req.params.id;
    const sql = 'DELETE FROM reviews WHERE ID = ?';

    db.query(sql, [id], function (err, result) {
        if (err) {
            console.error('Errore nella cancellazione della recensione', id, err);
            return res.status(500).json({ message: 'Errore nella cancellazione della recensione' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Recensione non trovata' });
        }

        res.status(200).json({ message: 'Recensione cancellata con successo' });
    });
};



module.exports = {
    getReviews,
    postReview,
    getReviewById,
    deleteReviewById

}
