import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../App'

function PatientNav() {

    const { state, dispatch } = useContext(UserContext)
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <div className="navbar-nav " style={{ marginLeft: 'auto' }}>
                    <Link to='/patient/home' className='nav-link' onClick={() => setActive('home')}>
                            {active === 'home' ? <a className="nav-link active" >Home</a> : <a className="nav-link" >Home</a>}
                        </Link>
                        <Link to='/patient/book-appointment' className='nav-link' onClick={() => setActive('book-appointment')}>{
                            active === 'book-appointment' ? <a className="nav-link active" >Book Appointment</a> : <a className="nav-link" >Book Appointment</a>
                        }</Link>
                        <Link to='/patient/appointment' className='nav-link' onClick={() => setActive('appointment')}>{
                            active === 'appointment' ? <a className="nav-link active" >My Appointment</a> : <a className="nav-link" >My Appointment</a>
                        }</Link>
                        <Link to='/patient/profile' className='nav-link' onClick={() => setActive('profile')}>{
                            active === 'profile' ? <a className="nav-link active" >Profile</a> : <a className="nav-link" >Profile</a>
                        }</Link>
                        <Link to='/patient/logout' className='nav-link' >{
                            <button class="btn btn-outline-primary mx-2 px-4" type="button">LogOut</button>
                        }</Link>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="navbar-nav " style={{ marginLeft: 'auto' }}>
                        <Link to='/patient/home' className='nav-link' onClick={() => setActive('home')}>
                            {active === 'home' ? <a className="nav-link active" >Home</a> : <a className="nav-link" >Home</a>}
                        </Link>
                        <Link to='/patient/book-appointment' className='nav-link' onClick={() => setActive('book-appointment')}>{
                            active === 'book-appointment' ? <a className="nav-link active" >Book Appointment</a> : <a className="nav-link" >Book Appointment</a>
                        }</Link>
                        <Link to='/patient/appointment' className='nav-link' onClick={() => setActive('appointment')}>{
                            active === 'appointment' ? <a className="nav-link active" >My Appointment</a> : <a className="nav-link" >My Appointment</a>
                        }</Link>
                        <Link to='/patient/profile' className='nav-link' onClick={() => setActive('profile')}>{
                            active === 'profile' ? <a className="nav-link active" >Profile</a> : <a className="nav-link" >Profile</a>
                        }</Link>
                        <Link to='/patient/login' className='nav-link' >{
                            <button class="btn btn-primary mx-2 px-4 " type="button">Login</button>
                        }</Link>
                        <Link to='/patient/signup' className='nav-link' >{
                            <button class="btn btn-primary mx-2 px-4 " type="button">Register</button>
                        }</Link>
                    </div>
                </>)
        }
    }

    const [active, setActive] = useState('home')
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginBottom: '10px' }}>
                <div className="container-fluid">
                    <Link to='/patient/home' className='nav-link' onClick={() => setActive('home')}>
                        <a className="navbar-brand" href="#">
                            <img src="../../charusat-logo.jpg" alt="Charusat-Logo" className='App-logo' />
                        </a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                        <RenderMenu />
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default PatientNav