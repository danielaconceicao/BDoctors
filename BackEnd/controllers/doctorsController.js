const db = require('../database/db');
const { emailRegex, phoneRegex } = require('../utils/helper');

// Recupera tutti i dottori
function index(req, res) {
    db.query('SELECT d.ID AS doctor_id, d.first_name, d.last_name, d.email, d.phone_number, d.address, GROUP_CONCAT(s.specialization_name ORDER BY s.specialization_name) AS specializations FROM doctors d JOIN doctor_specializations ds ON d.ID = ds.doctor_id JOIN specializations s ON ds.specialization_id = s.id GROUP BY d.ID', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error retrieving doctors' });
        }
        res.json(results);
    });
}

// Aggiungi un nuovo dottore
function store(req, res) {
    const { first_name, last_name, email, phone_number, address, specializations } = req.body;

    // Verifica che tutti i campi siano forniti
    if (!first_name || !last_name || !email || !phone_number || !address || !specializations) {
        return res.status(400).json({ error: 'All fields, including specializations, are required' });
    }

    // Verifica che first_name e last_name abbiano almeno 3 caratteri
    if (first_name.length < 3 || last_name.length < 3) {
        return res.status(400).json({ error: 'First name and last name must be at least 3 characters' });
    }

    // Verifica validità dell'email
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Verifica che il numero di telefono contenga solo numeri e/o "+"
    if (!phoneRegex.test(phone_number)) {
        return res.status(400).json({ error: 'Phone number can only contain numbers and the "+" character' });
    }

    // Verifica che le specializzazioni siano un array e contengano almeno un elemento
    if (!Array.isArray(specializations) || specializations.length === 0) {
        return res.status(400).json({ error: 'Specializations must be a non-empty array' });
    }

    // Query per aggiungere il dottore
    const doctorQuery = 'INSERT INTO doctors (first_name, last_name, email, phone_number, address) VALUES (?, ?, ?, ?, ?)';
    db.query(doctorQuery, [first_name, last_name, email, phone_number, address], (error, results) => {
        if (error) {
            console.error(error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Email already in use' });
            }
            return res.status(500).json({ error: 'Error adding doctor' });
        }

        const doctorId = results.insertId;

        // Associa le specializzazioni al dottore
        const specializationQuery = 'INSERT INTO doctor_specializations (doctor_id, specialization_id) VALUES ?';
        const specializationValues = specializations.map(specId => [doctorId, specId]);

        db.query(specializationQuery, [specializationValues], (specError) => {
            if (specError) {
                console.error(specError);
                return res.status(500).json({ error: 'Error associating specializations to doctor' });
            }

            res.status(201).json({ message: 'Doctor added successfully with specializations', id: doctorId });
        });
    });
}

// Calcola la media dei voti di un dottore
function getAverageRating(req, res) {
    const doctorId = req.params.id;

    if (!doctorId) {
        return res.status(400).json({ error: 'Doctor ID is required' });
    }

    // Query per ottenere le recensioni di un dottore
    const sql = 'SELECT AVG(rating) AS average_rating FROM reviews WHERE doctor_id = ?';

    db.query(sql, [doctorId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error calculating average rating' });
        }

        // Se non ci sono recensioni, restituiamo un messaggio che indichi l'assenza di valutazioni
        if (results[0].average_rating === null) {
            return res.status(404).json({ error: 'No reviews found for this doctor' });
        }

        // Assicuriamoci che average_rating sia un numero
        const averageRating = parseFloat(results[0].average_rating);

        // Verifica se la conversione ha avuto successo
        if (isNaN(averageRating)) {
            return res.status(500).json({ error: 'Invalid average rating value' });
        }

        // Applica toFixed per limitare a 2 decimali
        res.json({ doctor_id: doctorId, average_rating: averageRating.toFixed(2) });
    });
}

// Elimina un dottore
function destroy(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Doctor ID is required' });
    }

    // Rimuovi prima le associazioni del dottore nella tabella doctor_specializations
    db.query('DELETE FROM doctor_specializations WHERE doctor_id = ?', [id], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error deleting doctor specializations' });
        }

        // Una volta eliminate le associazioni, elimina il dottore
        db.query('DELETE FROM doctors WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error deleting doctor' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Doctor not found' });
            }

            res.json({ message: 'Doctor deleted successfully' });
        });
    });
}


module.exports = {
    index,
    store,
    getAverageRating,
    destroy,
};
