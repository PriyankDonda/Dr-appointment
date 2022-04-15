import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../App'

function AdminNav() {
    
    const { state, dispatch } = useContext(UserContext)
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <div className="navbar-nav " style={{ marginLeft: 'auto' }}>
                        <Link to='/admin/dashboard' className='nav-link' onClick={() => setActive('dashboard')}>{
                            active === 'dashboard' ? <a className="nav-link active" >Dashboard</a> : <a className="nav-link" >Dashboard</a>
                        }</Link>
                        <Link to='/admin/doctor' className='nav-link' onClick={() => setActive('doctor')}>{
                            active === 'doctor' ? <a className="nav-link active" >Doctor</a> : <a className="nav-link" >Doctor</a>
                        }</Link>
                        <Link to='/admin/patient' className='nav-link' onClick={() => setActive('patient')}>{
                            active === 'patient' ? <a className="nav-link active" >Patient</a> : <a className="nav-link" >Patient</a>
                        }</Link>
                        <Link to='/admin/doctor-schedule' className='nav-link' onClick={() => setActive('doctor-schedule')}>{
                            active === 'doctor-schedule' ? <a className="nav-link active" >Doctor Schedule</a> : <a className="nav-link" >Doctor Schedule</a>
                        }</Link>
                        <Link to='/admin/appointment' className='nav-link' onClick={() => setActive('appointment')}>{
                            active === 'appointment' ? <a className="nav-link active" >Appointment</a> : <a className="nav-link" >Appointment</a>
                        }</Link>
                        <Link to='/admin/profile' className='nav-link' onClick={() => setActive('profile')}>{
                            active === 'profile' ? <a className="nav-link active" >Profile</a> : <a className="nav-link" >Profile</a>
                        }</Link>
                        <Link to='/admin/logout' className='nav-link' >{
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
                        <Link to='/admin/dashboard' className='nav-link' onClick={() => setActive('dashboard')}>{
                            active === 'dashboard' ? <a className="nav-link active" >Dashboard</a> : <a className="nav-link" >Dashboard</a>
                        }</Link>
                        <Link to='/admin/doctor' className='nav-link' onClick={() => setActive('doctor')}>{
                            active === 'doctor' ? <a className="nav-link active" >Doctor</a> : <a className="nav-link" >Doctor</a>
                        }</Link>
                        <Link to='/admin/patient' className='nav-link' onClick={() => setActive('patient')}>{
                            active === 'patient' ? <a className="nav-link active" >Patient</a> : <a className="nav-link" >Patient</a>
                        }</Link>
                        <Link to='/admin/doctor-schedule' className='nav-link' onClick={() => setActive('doctor-schedule')}>{
                            active === 'doctor-schedule' ? <a className="nav-link active" >Doctor Schedule</a> : <a className="nav-link" >Doctor Schedule</a>
                        }</Link>
                        <Link to='/admin/appointment' className='nav-link' onClick={() => setActive('appointment')}>{
                            active === 'appointment' ? <a className="nav-link active" >Appointment</a> : <a className="nav-link" >Appointment</a>
                        }</Link>
                        <Link to='/admin/profile' className='nav-link' onClick={() => setActive('profile')}>{
                            active === 'profile' ? <a className="nav-link active" >Profile</a> : <a className="nav-link" >Profile</a>
                        }</Link>
                        <Link to='/admin/login' className='nav-link' >{
                            <button class="btn btn-primary mx-2 px-4 " type="button">Login</button>
                        }</Link>
                    </div>
                </>)
        }
    }

    const [active, setActive] = useState('dashboard')
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginBottom: '10px' }}>
                <div className="container-fluid">
                    <Link to='/admin/dashboard' className='nav-link' onClick={() => setActive('dashboard')}>
                        <a className="navbar-brand" href="#">
                            <img src="../../charusat-logo.jpg" alt="Charusat-Logo" className='App-logo' />
                        </a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                        {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                <Link to='/admin/dashboard' className='nav-link'><a className="nav-link active" aria-current="page" >Dashboard</a></Link>
                                </li>
                                <li class="nav-item">
                                <Link to='/admin/doctor' className='nav-link'><a className="nav-link" >Doctor</a></Link>
                                </li>
                                <li class="nav-item">
                                <Link to='/admin/patient' className='nav-link'><a className="nav-link" >Patient</a></Link>
                                </li>
                                <li class="nav-item">
                                <Link to='/admin/doctor-schedule' className='nav-link'><a className="nav-link" >Doctor Schedule</a></Link>
                                </li>
                                <li class="nav-item">
                                <Link to='/admin/appointment' className='nav-link'><a className="nav-link" >Appointment</a></Link>
                                </li>
                                <li class="nav-item">
                                <Link to='/admin/profile' className='nav-link'><a className="nav-link" >Profile</a></Link>
                                </li>
                                <li class="nav-item">
                                <button class="btn btn-outline-primary mx-2 px-4 my-2" type="button">LogOut</button>
                                </li>
                            </ul> */}

                        {/* <div className="navbar-nav " style={{ marginLeft: 'auto' }}>
                                <Link to='/admin/dashboard' className='nav-link' onClick={()=>setActive('dashboard')}>{
                                    active === 'dashboard' ? <a className="nav-link active" >Dashboard</a> : <a className="nav-link" >Dashboard</a>
                                }</Link>
                                <Link to='/admin/doctor' className='nav-link' onClick={()=>setActive('doctor')}>{
                                    active === 'doctor' ? <a className="nav-link active" >Doctor</a> : <a className="nav-link" >Doctor</a>
                                }</Link>
                                <Link to='/admin/patient' className='nav-link' onClick={()=>setActive('patient')}>{
                                    active === 'patient' ? <a className="nav-link active" >Patient</a> : <a className="nav-link" >Patient</a>
                                }</Link>
                                <Link to='/admin/doctor-schedule' className='nav-link' onClick={()=>setActive('doctor-schedule')}>{
                                    active === 'doctor-schedule' ? <a className="nav-link active" >Doctor Schedule</a> : <a className="nav-link" >Doctor Schedule</a>
                                }</Link>
                                <Link to='/admin/appointment' className='nav-link' onClick={()=>setActive('appointment')}>{
                                    active === 'appointment' ? <a className="nav-link active" >Appointment</a> : <a className="nav-link" >Appointment</a>
                                }</Link>
                                <Link to='/admin/profile' className='nav-link' onClick={()=>setActive('profile')}>{
                                    active === 'profile' ? <a className="nav-link active" >Profile</a> :<a className="nav-link" >Profile</a>
                                }</Link> */}

                        <RenderMenu />
                        {/* <Link to='/admin/login' className='nav-link' >{
                                    <button class="btn btn-primary mx-2 px-4 " type="button">Login</button>
                                }</Link> */}
                        {/* <Link to='/admin/logout' className='nav-link' >{
                                    <button class="btn btn-outline-primary mx-2 px-4" type="button">LogOut</button>
                                }</Link> */}

                        {/* <button class="btn btn-outline-primary mx-2 px-4 my-2" type="button">Login</button> */}
                        {/* <button class="btn btn-outline-primary mx-2 px-4 my-2" type="button">LogOut</button> */}
                        {/* </div> */}
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default AdminNav