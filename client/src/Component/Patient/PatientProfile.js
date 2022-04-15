import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

function PatientProfile() {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();

    const [profile, setProfile] = useState({})
    const [email, setEmail] = useState('2a@gmail.com')
    const [password, setPassword] = useState('')
    const [first_name, setFName] = useState('patient')
    const [last_name, setLName] = useState('testing')
    const [dob, setDob] = useState()
    const [gender, setGender] = useState('Male')
    const [phone_no, setPhoneno] = useState('1234567890')
    const [maritial_status, setMStatus] = useState('Single')
    const [address, setAddress] = useState('somewhere')

    const fillData = (data) => {
        setEmail(data.email)
        setFName(data.first_name)
        setLName(data.last_name)
        setGender(data.gender)
        setMStatus(data.maritial_status)
        setAddress(data.address)
        setPhoneno(data.phone_no)
        setPassword('')

        const offset = new Date(data.dob).getTimezoneOffset()
        const yourDate = new Date(new Date(data.dob).getTime() - (offset * 60 * 1000))
        setDob(yourDate.toISOString().split('T')[0])
    }

    const checklogedin = async () => {
        try {
            const res = await fetch('/patient/Profile', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json()
            // console.log('data : ', data)

            if (res.status !== 200) {
                throw new Error(res.error)
            }

            dispatch({ type: "USER", payload: true })
            setProfile(data)
            fillData(data)

            console.log('updated....')
        } catch (e) {
            console.log('error : ', e)
            navigate('/patient/login')
        }
    }
    useEffect(() => {
        checklogedin()
    }, [])

    const handleUpdate = async () => {
        try {
            const res = await fetch('/patient/Profile', {
                method: "PATCH",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password, first_name, last_name, phone_no, gender, maritial_status, address, dob })
            })
            const data = await res.json()
            console.log(data)

            if (res.status !== 200) {
                window.alert("Invalid Update")
                throw new Error(res.error)
            }
            else {
                window.alert("Updated Successfully!")
                fillData(data)
                setProfile(data)
            }

        } catch (error) {
            fillData(profile)
            console.log('error : ', error)
        }
    }

    return (
        <>
            <div className='container-sm container-box'>
                <div class="card shadow">
                    <div class="card-header" style={{ display: 'flex' }}>
                        Profile
                        <button type="button" class="btn btn-primary" onClick={() => handleUpdate()} style={{ marginLeft: 'auto', marginTop: '4px', cursor: 'pointer' }}>Edit</button>
                        {/* <i class="fa-solid fa-arrows-rotate" onClick={() => setFilter(doctors)} style={{ marginLeft: 'auto', marginTop: '4px', cursor: 'pointer' }}></i> */}
                    </div>
                    <div class="card-body">
                        <div class="container">
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

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientProfile 