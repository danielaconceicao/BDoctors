const db = require('../database/db')
const { verifyDoctorId, ratingRegex, nameRegex } = require('../utils/helper.js');
const { sendEmail } = require('../utils/emailService');

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
const postReview = async function (req, res) {
    const { first_name, last_name, description, rating, doctor_id, user_email } = req.body;

    if (!first_name || !last_name || !description || !rating || !doctor_id || !user_email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
        return res.status(401).json({
            error: 'The name must consist only of alphabetic characters, at least 3 characters long, with the first letter capitalized.',
        });
    }

    if (!ratingRegex.test(rating)) {
        return res.status(401).json({ error: 'The rating must be a number from 1 to 5' });
    }

    try {
        console.log('Retrieving doctor email');
        const doctorQuery = 'SELECT email, first_name FROM doctors WHERE ID = ?';
        const doctor = await new Promise((resolve, reject) => {
            db.query(doctorQuery, [doctor_id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error('Doctor not found'));
                resolve(results[0]);
            });
        });

        console.log('Inserting review into database');
        const sql = 'INSERT INTO reviews (first_name, last_name, description, rating, doctor_id, date) VALUES (?, ?, ?, ?, ?, CURDATE())';
        await new Promise((resolve, reject) => {
            db.query(sql, [first_name, last_name, description, rating, doctor_id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        console.log('Sending email to doctor');
        const doctorEmailContent = `
            Ciao Dr. ${doctor.first_name},

            È stata inviata una nuova recensione:
            - Recensore: ${first_name} ${last_name}
            - Voto: ${rating}/5
            - Descrizione: "${description}"
        `;
        await sendEmail(doctor.email, 'Nuova Recensione', doctorEmailContent);

        console.log('Sending email to user');
        const userEmailContent = `
            Ciao ${first_name} ${last_name},

            Grazie per la recensione! Ecco a te i dettagli :
            - Dottore: Dr. ${doctor.first_name}
            - Voto: ${rating}/5
            - La tua recensione: "${description}"
        `;
        await sendEmail(user_email, 'Grazie per la tua recensione!', userEmailContent);

        console.log('All operations completed successfully');
        res.status(200).json({ message: 'Review successfully saved and emails sent' });
    } catch (error) {
        console.error('Error processing the review:', error);
        res.status(500).json({ error: 'An error occurred while saving the review or sending emails', details: error.message });
    }
};





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
