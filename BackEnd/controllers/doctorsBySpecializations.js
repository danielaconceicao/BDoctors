const db = require('../database/db')


function getDoctorBySpecializations(req, res) {
    const specialization = req.params.specialization

    console.log(specialization);

    db.query('SELECT d.ID AS doctor_id, d.first_name, d.last_name, d.email, d.phone_number, d.address, GROUP_CONCAT(s.specialization_name ORDER BY s.specialization_name) AS specializations FROM doctors d JOIN doctor_specializations ds ON d.ID = ds.doctor_id JOIN specializations s ON ds.specialization_id = s.id GROUP BY d.ID', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error retrieving doctors' });
        }
        // res.json(results);
        console.log(results);

        const resultsBySpecializations = results.filter(doctor => doctor.specializations.split(',').includes(specialization))

        console.log(resultsBySpecializations);
        res.json(resultsBySpecializations);


    });
}


module.exports = {
    getDoctorBySpecializations,
};