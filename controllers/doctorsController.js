const db = require('../db');


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

    if (!Nome || !Cognome || !Email || !Specializzazione || !Telefono || !Indirizzo) {
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

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
