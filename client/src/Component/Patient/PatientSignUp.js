import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// import { UserContext } from '../../App'

function PatientSignUp() {
    // const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate()
    const [email, setEmail] = useState('p@gmail.com')
    const [password, setPassword] = useState('12345678')
    const [first_name, setFName] = useState('patient')
    const [last_name, setLName] = useState('testing')
    const [dob, setDob] = useState(new Date('2002-5-8').toISOString().split('T')[0])
    const [gender, setGender] = useState('Male')
    const [phone_no, setPhoneno] = useState('1234567890')
    const [maritial_status, setMStatus] = useState('Single')
    const [address, setAddress] = useState('somewhere')
    const signupUser = async (e) => {
        e.preventDefault()
        const res = await fetch('/patient/signup', {
            method: "POST",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            // credentials: "include",
            body: JSON.stringify({ email, password, first_name, last_name, dob, gender, phone_no, maritial_status, address })
        })
        const data = res.json()

        if (res.status !== 201 || !data) {
            window.alert("Invalid Credentials or Email is Already Regestered !")
        }
        else {
            // dispatch({ type: "USER", payload: true })
            window.alert("Regesteration successfull...")
            navigate('/patient/login')
        }
    }

    return (
        <div className='shadow p-3 mb-5 bg-body rounded signup-card' >
            <form className='card-body' method='POST'>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h3 className='display-7 flexCenter'>Patient Register</h3>
                </div>
                <div class="row " >
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address <i style={{ color: 'red' }}>*</i></label>
                        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div class="row " >
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password <i style={{ color: 'red' }}>*</i></label>
                        <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" aria-describedby="passwordHelpBlock" />
                        <div id="passwordHelpBlock" class="form-text">Your password must be 8-20 characters long</div>
                    </div>
                </div>
                <div class="row " >
                    <div className='col'>
                        <div class="mb-3">
                            <label for="exampleInputText1" class="form-label">First Name <i style={{ color: 'red' }}>*</i></label>
                            <input type="text" class="form-control" value={first_name} onChange={(e) => setFName(e.target.value)} id="exampleInputText1" />
                        </div>
                    </div>
                    <div className='col'>
                        <div class="mb-3">
                            <label for="exampleInputText2" class="form-label">Last Name <i style={{ color: 'red' }}>*</i></label>
                            <input type="text" class="form-control" value={last_name} onChange={(e) => setLName(e.target.value)} id="exampleInputText2" />
                        </div>
                    </div>
                </div>
                <div class="row " >
                    <div className='col'>
                        <div class="mb-3">
                            <label for="exampleInputText3" class="form-label">Date of Birth <i style={{ color: 'red' }}>*</i></label>
                            <input type="date" class="form-control" value={dob} onChange={(e) => setDob(e.target.value)} id="exampleInputText3" />
                        </div>
                    </div>
                    <div className='col'>
                        <label for="exampleInputText4" class="form-label">Gender <i style={{ color: 'red' }}>*</i></label>
                        <select class="form-select" value={gender} onChange={(e) => setGender(e.target.value)} aria-label="Default select example">
                            <option selected value='Male'>Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="row " >
                    <div className='col'>
                        <div class="mb-3">
                            <label for="exampleInputText5" class="form-label">Contact No. <i style={{ color: 'red' }}>*</i></label>
                            <input type="text" class="form-control" id="exampleInputText5" onChange={(e) => setPhoneno(e.target.value)} value={phone_no} />
                        </div>
                    </div>
                    <div className='col'>
                    <label for="exampleInputText6" class="form-label">Maritial Status <i style={{ color: 'red' }}>*</i></label>
                        <select class="form-select" value={maritial_status} onChange={(e) => setMStatus(e.target.value)} aria-label="Default select example">
                            <option selected value='Single'>Single</option>
                            <option value="Married">Married</option>
                            <option value="Seperated">Seperated</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                        </select>
                    </div>
                </div>
                <div class="row " >
                <div class="mb-3">
                            <label for="exampleInputText7" class="form-label">Address <i style={{ color: 'red' }}>*</i></label>
                            <textarea class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="exampleInputText7" />
                            {/* <input type="textarea" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} id="exampleInputText7" /> */}
                        </div>
                </div>


                <div className='flexCenter' style={{ marginTop: '2rem' }}>
                    <button type="submit" class="btn btn-primary" onClick={(e) => signupUser(e)} style={{ padding: '0.5rem 1.7rem' }}>Register</button>
                </div>
                <Link to='/patient/login' className='nav-link' >{
                    <div className='flexCenter' >
                        <a class="card-link text-decoration-none" style={{ cursor: 'pointer' }}>Login</a>
                    </div>
                }</Link>

            </form>
        </div>
    )
}

export default PatientSignUp