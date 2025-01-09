const db = require('../database/db')


const getReviews = function (req, res) {

    db.query('SELECT * FROM recensioni', function (err, results) {
        if (err) {
            console.error('Errore nel recupero delle recensioni', err)
        } else {
            res.json(results)
        }
    })
}

const postReview = function (req, res) {
    const { Nome, Cognome, Descrizione, Voto, DoctorID } = req.body

    if (!Nome || !Cognome || !Descrizione || !Voto || !DoctorID) {
        return res.status(400).send('Tutti i campi sono obbligatori')
    }
    const sql = 'INSERT INTO recensioni (Nome, Cognome, Descrizione, Voto, DoctorID) VALUES (?,?,?,?,?)'

    db.query(sql, [Nome, Cognome, Descrizione, Voto, DoctorID], function (err) {
        if (err) {
            console.error('Errore nel salvataggio della recensione', err)
        } else {
            res.status(200).send('Recensione salvata con successo')
        }
    })
}

const getReviewById = function (req, res) {
    const id = req.params.id

    const sql = 'SELECT * FROM recensioni WHERE id = ?'

    db.query(sql, [id], function (err, results) {
        if (err) {
            console.error('Errore nel recupero della recensione', id, err)
        } else {
            res.json(results)
        }
    })
}


const deleteReviewById = function (req, res) {
    const id = req.params.id
    const sql = 'DELETE FROM recensioni WHERE id =?'
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
