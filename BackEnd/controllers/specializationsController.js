const db = require('../database/db');

// Recupera tutte le specializzazioni
function index(req, res) {
    db.query('SELECT * FROM specializations', (error, results) => {
        if (error) {
            console.error('Error retrieving specializations:', error);
            return res.status(500).json({ error: 'Error retrieving specializations' });
        }
        res.json(results);
    });
}

// // Aggiungi una nuova specializzazione
// function store(req, res) {
//     const { specialization_name } = req.body;

//     // Verifica che il nome della specializzazione sia fornito
//     if (!specialization_name || specialization_name.trim().length < 3) {
//         return res.status(400).json({ error: 'The specialization name must be at least 3 characters long' });
//     }

//     // Query per aggiungere una nuova specializzazione
//     db.query(
//         'INSERT INTO specializations (specialization_name) VALUES (?)',
//         [specialization_name],
//         (error, results) => {
//             if (error) {
//                 console.error('Error adding specialization:', error);
//                 return res.status(500).json({ error: 'Error adding specialization' });
//             }
//             res.status(201).json({ message: 'Specialization successfully added', id: results.insertId });
//         }
//     );
// }

// // Elimina una specializzazione
// function destroy(req, res) {
//     const { id } = req.params;

//     if (!id) {
//         return res.status(400).json({ error: 'Specialization ID is required' });
//     }

//     // Query per eliminare una specializzazione
//     db.query(
//         'DELETE FROM specializations WHERE id = ?',
//         [id],
//         (error, results) => {
//             if (error) {
//                 console.error('Error deleting specialization:', error);
//                 return res.status(500).json({ error: 'Error deleting specialization' });
//             }

//             if (results.affectedRows === 0) {
//                 return res.status(404).json({ error: 'Specialization not found' });
//             }

//             res.json({ message: 'Specialization successfully deleted' });
//         }
//     );
// }

module.exports = {
    index,
    // store,
    // destroy,
};
