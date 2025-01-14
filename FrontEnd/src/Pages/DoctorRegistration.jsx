import {useState} from 'react';

export default function DoctorRegistration(){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setAddress] = useState('');


    function handleFormSubmit(e){
        e.preventDefault();

        const doctorData = {first_name: firstName, last_name: lastName, email, phone_number: phone, address};
        const bdoctors = 'http://localhost:3000/doctors';

        fetch(bdoctors, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(doctorData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                /* console.log('medico registrato con successo'); */
            })
        .catch((error) => {
            console.error('Error:', error);
            console.log('Errore durante la registrazione del medico');
        });
    }


    return(
        <div className="container">
            <div id="form-card" className="card">
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Nome</label>
                            <input name="name" id="name" type="text" className="form-control" placeholder="your name here" value={firstName} onChange={(e) => setFirstName(e.target.value)}  required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name">Cognome</label>
                            <input name="name" id="name" type="text" className="form-control" placeholder="your name here" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlForfor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label" htmlForfor="typePhone">Phone number input</label>
                            <input type="tel" id="typePhone" className="form-control" value={phone} onChange={(e) => setphone(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlForfor="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} required />
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