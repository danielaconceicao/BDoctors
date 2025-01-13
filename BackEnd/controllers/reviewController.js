const db = require('../database/db')
const { verifyDoctorId, ratingRegex, nameRegex } = require('../utils/helper.js');

// recupera tutte le recensioni presenti nel data base
const getReviews = function (req, res) {

    db.query('SELECT * FROM reviews', function (err, results) {
        if (err) {
            console.error('Error retrieving reviews', err)
        } else if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Review not found' });
        } else {
            res.json(results)
        }
    })
}

// aggiungi una recensione al database
const postReview = function (req, res) {
    const { first_name, last_name, description, rating, doctor_id } = req.body

    if (!first_name || !last_name || !description || !rating || !doctor_id) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
        return res.status(401).json({ error: 'The name must consist only of alphabetic characters, at least 3 characters long, with the first letter capitalized.' });
    }

    if (!ratingRegex.test(rating)) {
        return res.status(401).json({ error: 'The rating must be a character from 1 to 5' })
    }

    // verifica che il dottore associato alla recensione sia presente nel database
    verifyDoctorId(doctor_id, req, res)

    const sql = 'INSERT INTO reviews (first_name, last_name, description, rating, doctor_id) VALUES (?,?,?,?,?)'

    db.query(sql, [first_name, last_name, description, rating, doctor_id], function (err) {
        if (err) {
            console.error('Error saving the review', err)
        } else {
            res.status(200).json({ message: 'Review successfully saved' })
        }
    })
}

// recupera una recensione specifica per ID
const getReviewById = function (req, res) {
    const { id } = req.params;

    const sql = 'SELECT * FROM reviews WHERE doctor_id = ?';  // Filtra per doctor_id

    db.query(sql, [id], function (err, results) {
        if (err) {
            console.error('Error retrieving the review', id, err);
            return res.status(500).json({ error: 'Error retrieving the review' });
        } else if (results.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        } else {
            res.json(results);
        }
    });
}

// cancella una recensione specifica per ID
const deleteReviewById = function (req, res) {
    const id = req.params.id;
    const sql = 'DELETE FROM reviews WHERE ID = ?';

    db.query(sql, [id], function (err, result) {
        if (err) {
            console.error('Error deleting the review', id, err);
            return res.status(500).json({ message: 'Error deleting the review' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json({ message: 'Review successfully deleted' });
    });
};

module.exports = {
    getReviews,
    postReview,
    getReviewById,
    deleteReviewById
}
