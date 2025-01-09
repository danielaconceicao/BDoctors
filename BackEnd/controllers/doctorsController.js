const db = require('../database/db');
const { emailRegex, phoneRegex } = require('../utils/helper');

// Recupera tutti i dottori
function index(req, res) {
    db.query('SELECT * FROM doctors', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error retrieving doctors' });
        }
        res.json(results);
    });
}

// Aggiungi un nuovo dottore
function store(req, res) {
    const { first_name, last_name, email, specialization, phone_number, address } = req.body;

    // Verifica che tutti i campi siano forniti
    if (!first_name || !last_name || !email || !specialization || !phone_number || !address) {
        return res.status(400).json({ error: 'All fields are required' });
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

    // Query per aggiungere il dottore
    db.query(
        'INSERT INTO doctors (first_name, last_name, email, specialization, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, specialization, phone_number, address],
        (error, results) => {
            if (error) {
                console.error(error);
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already in use' });
                }
                return res.status(500).json({ error: 'Error adding doctor' });
            }
            res.status(201).json({ message: 'Doctor added successfully', id: results.insertId });
        }
    );
}

// Elimina un dottore
function destroy(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Doctor ID is required' });
    }

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
}

module.exports = {
    index,
    store,
    destroy,
};
