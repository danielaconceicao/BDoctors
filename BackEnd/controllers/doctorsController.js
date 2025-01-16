const db = require('../database/db');
const { emailRegex, phoneRegex } = require('../utils/helper');
const { sendEmail } = require('../utils/emailService');

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
    const { first_name, last_name, email, phone_number, address, specializations, curriculum } = req.body;

    // Verifica che tutti i campi siano forniti
    if (!first_name || !last_name || !email || !phone_number || !address || !specializations || !curriculum) {
        return res.status(400).json({ error: 'All fields, including specializations and curriculum, are required' });
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

    // Verifica lunghezza massima per il curriculum
    if (curriculum.length > 255) {
        return res.status(400).json({ error: 'Curriculum must not exceed 255 characters' });
    }

    // Query per aggiungere il dottore
    const doctorQuery = 'INSERT INTO doctors (first_name, last_name, email, phone_number, address, curriculum) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(doctorQuery, [first_name, last_name, email, phone_number, address, curriculum], (error, results) => {
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

            res.status(201).json({ message: 'Doctor added successfully with specializations and curriculum', id: doctorId });
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

// Invia un'email al dottore
async function sendEmailToDoctor(req, res) {
    const { doctor_id } = req.params;
    const { subject, message } = req.body;

    if (!doctor_id || !subject || !message) {
        return res.status(400).json({ error: 'Doctor ID, subject, and message are required' });
    }

    try {
        // Recupera l'email del dottore dal database
        const query = 'SELECT email, first_name, last_name FROM doctors WHERE ID = ?';
        db.query(query, [doctor_id], async (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error retrieving doctor details' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'Doctor not found' });
            }

            const doctor = results[0];
            const emailContent = `
                Ciao Dr. ${doctor.first_name} ${doctor.last_name},
                
                ${message}
            `;

            // Invia l'email
            await sendEmail(doctor.email, subject, emailContent);

            res.status(200).json({ message: 'Email sent successfully to the doctor' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}


module.exports = {
    index,
    store,
    getAverageRating,
    destroy,
    sendEmailToDoctor
};
