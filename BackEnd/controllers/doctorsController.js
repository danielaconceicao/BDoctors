const db = require('../database/db');
const { emailRegex } = require('../utils/helper');

// Recupera tutti i dottori
function index(req, res) {
    db.query('SELECT * FROM Dottori', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Errore nel recupero dei dati' });
        }
        res.json(results);
    });
}

// Aggiungi un nuovo dottore
function store(req, res) {
    const { Nome, Cognome, Email, Specializzazione, Telefono, Indirizzo } = req.body;

    // Verifica che tutti i campi siano forniti
    if (!Nome || !Cognome || !Email || !Specializzazione || !Telefono || !Indirizzo) {
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

    // Verifica che Nome e Cognome abbiano almeno 3 caratteri
    if (Nome.length < 3 || Cognome.length < 3) {
        return res.status(400).json({ error: 'Nome e Cognome devono avere almeno 3 caratteri' });
    }

    // Verifica validità dell'Email
    if (!emailRegex.test(Email)) {
        return res.status(400).json({ error: 'Email non valida' });
    }

    // Query per aggiungere il dottore
    db.query(
        'INSERT INTO Dottori (Nome, Cognome, Email, Specializzazione, Telefono, Indirizzo) VALUES (?, ?, ?, ?, ?, ?)',
        [Nome, Cognome, Email, Specializzazione, Telefono, Indirizzo],
        (error, results) => {
            if (error) {
                console.error(error);
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email già in uso' });
                }
                return res.status(500).json({ error: 'Errore durante l\'inserimento del dottore' });
            }
            res.status(201).json({ message: 'Dottore aggiunto con successo', id: results.insertId });
        }
    );
}

// Elimina un dottore
function destroy(req, res) {
    const { id } = req.params;
    // console.log(id);

    if (!id) {
        return res.status(400).json({ error: 'ID del dottore è obbligatorio' });
    }

    db.query('DELETE FROM Dottori WHERE ID = ?', [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Errore durante l\'eliminazione del dottore' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Dottore non trovato' });
        }

        res.json({ message: 'Dottore eliminato con successo' });
    });
}


module.exports = {
    index,
    store,
    destroy
}
