import { useState, useEffect } from 'react';

export default function DoctorRegistration() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/specializations')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSpecializations(data)
            })
            .catch((error) => { console.error(error) });
    }, []);


    function handleCheckboxChange(specId) {
        if (selectedSpecializations.includes(specId)) {
            // Desmarca a especialização
            setSelectedSpecializations(selectedSpecializations.filter((id) => id !== specId));
        } else {
            // Marca a especialização
            setSelectedSpecializations([...selectedSpecializations, specId]);
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const doctorData = { first_name: firstName, last_name: lastName, email: email, phone_number: phone, address: address, specializations: selectedSpecializations };
        const bdoctors = 'http://localhost:3000/doctors';

        fetch(bdoctors, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(doctorData),
        })
            .then((res) => {
                if(!res.ok){
                    return res.json().then((error) => {
                        throw new Error(error.message || 'Errore durante la registrazione del medico');
                    });
                }
                return res.json();
            })
            .then(data => {
                console.log(data);

                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setAddress('');
                setSelectedSpecializations([]);
            })
            .catch((error) => {
                console.error('Error:', error);
                console.log('Errore durante la registrazione del medico');
            });
    }


    return (
        <div className="container">
            <div id="form-card" className="card">
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Nome</label>
                            <input name="name" id="name" type="text" className="form-control" placeholder="il tuo nome. es: Raqueline" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name">Cognome</label>
                            <input name="lastName" id="lastName" type="text" className="form-control" placeholder="il tuo cognome. es: Rapariga" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='latuaemail@email.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-group">
                            <label className='pb-3'>Specializzazione</label>
                            {specializations.map((spec) => (
                                <div key={spec.id} className="form-check">
                                    <input type="checkbox" id={`specialization-${spec.id}`} value={spec.id}className="form-check-input" checked={selectedSpecializations.includes(spec.id)} onChange={() => handleCheckboxChange(spec.id)}/>
                                    <label htmlFor={`specialization-${spec.id}`} className="form-check-label">
                                        {spec.specialization_name}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="form-outline mb-3 pt-3">
                            <label className="form-label" htmlFor="typePhone">Numero di telefono</label>
                            <input type="tel" id="typePhone" className="form-control" placeholder='345678912' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label">Indirizzo</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="via piemonte, 5, MI" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Inviare</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}