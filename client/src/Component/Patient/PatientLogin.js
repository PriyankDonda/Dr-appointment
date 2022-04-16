import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../App'

function PatientLogin() {
    const { state, dispatch } = useContext(UserContext)

    const navigate = useNavigate()
    const [email, setEmail] = useState('p@gmail.com')
    const [password, setPassword] = useState('')
    const loginUser = async (e) => {
        e.preventDefault()
        const res = await fetch('/patient/login', {
            method: "POST",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            // credentials: "include",
            body: JSON.stringify({ email, password })
        })
        const data = res.json()

        if (res.status !== 200 || !data) {
            window.alert("Invalid Credentials")
        }
        else {
            dispatch({ type: "USER", payload: true })
            // window.alert("Login successfull")
            navigate('/patient/home')
        }
    }

    return (
        <div className='shadow p-3 mb-5 bg-body rounded login-card' >
            <form className='card-body' method='POST'>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h3 className='display-7 flexCenter'>Patient Login</h3>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
                </div>
                <a class="card-link text-decoration-none" style={{ cursor: 'pointer' }}>Forgot Password?</a>
                <div className='flexCenter' style={{ marginTop: '2rem' }}>
                    <button type="submit" class="btn btn-primary" onClick={(e) => loginUser(e)} style={{ padding: '0.5rem 1.7rem' }}>Login</button>
                </div>
                <Link to='/patient/signup' className='nav-link' >{
                    <div className='flexCenter' >
                        <a class="card-link text-decoration-none" style={{ cursor: 'pointer' }}>Register</a>
                    </div>
                }</Link>

            </form>
        </div>
    )
}

export default PatientLogin