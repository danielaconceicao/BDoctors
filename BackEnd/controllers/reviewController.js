const db = require('../database/db')


const getReviews = function (req, res) {

    db.query('SELECT * FROM reviews', function (err, results) {
        if (err) {
            console.error('Errore nel recupero delle recensioni', err)
        } else {
            res.json(results)
        }
    })
}

const postReview = function (req, res) {
    const { first_name, last_name, description, rating, DoctorID } = req.body

    if (!first_name || !last_name || !description || !rating || !DoctorID) {
        return res.status(400).send('Tutti i campi sono obbligatori')
    }
    const sql = 'INSERT INTO reviews (first_name, last_name, description, rating, DoctorID) VALUES (?,?,?,?,?)'

    db.query(sql, [first_name, last_name, description, rating, DoctorID], function (err) {
        if (err) {
            console.error('Errore nel salvataggio della recensione', err)
        } else {
            res.status(200).send('Recensione salvata con successo')
        }
    })
}

const getReviewById = function (req, res) {
    const id = req.params

    const sql = 'SELECT * FROM reviews WHERE ID = ?'

    db.query(sql, [id], function (err, results) {
        if (err) {
            console.error('Errore nel recupero della recensione', id, err)
        } else {
            res.json(results)
        }
    })
}


const deleteReviewById = function (req, res) {
    const id = req.params
    const sql = 'DELETE FROM reviews WHERE ID =?'
    db.query(sql, [id], function (err) {
        if (err) {
            console.error('Errore nel cancellazione della recensione', id, err)
        } else {
            res.status(200).send('Recensione cancellata con successo')
        }
    })
}


module.exports = {
    getReviews,
    postReview,
    getReviewById,
    deleteReviewById

}
