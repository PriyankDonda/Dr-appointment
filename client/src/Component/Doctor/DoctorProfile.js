import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

function DoctorProfile() {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate();

    const [profile, setProfile] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone_no, setPhoneno] = useState('')
    const [degree, setDegree] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState(new Date())

    const fillData = (data) => {
        setName(data.name)
        setEmail(data.email)
        setDegree(data.degree)
        setSpeciality(data.speciality)
        setAddress(data.address)
        setPhoneno(data.phone_no)
        setPassword('')

        const offset = new Date(data.dob).getTimezoneOffset()
        const yourDate = new Date(new Date(data.dob).getTime() - (offset * 60 * 1000))
        setDob(yourDate.toISOString().split('T')[0])
    }

    const checklogedin = async () => {
        try {
            const res = await fetch('/doctor/Profile', {
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
            navigate('/doctor/login')
        }
    }
    useEffect(() => {
        checklogedin()
    }, [])

    const handleUpdate = async () => {
        try {
            const res = await fetch('/doctor/Profile', {
                method: "PATCH",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password, name, phone_no, degree, speciality, address, dob })
            })
            const data = await res.json()
            console.log(data)

            if (res.status !== 200) {
                window.alert("Invalid Data")
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
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">Doctor Email Address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Doctor Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Your password must be 8-20 characters long' onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </div>
                                </div>
                            </div>
                            <div class="row " >
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputText1" class="form-label">Doctor Name</label>
                                        <input type="text" class="form-control" id="exampleInput1" onChange={(e) => setName(e.target.value)} value={name} />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputText2" class="form-label">Doctor Phone No.</label>
                                        <input type="text" class="form-control" id="exampleInput2" onChange={(e) => setPhoneno(e.target.value)} value={phone_no} />
                                    </div>
                                </div>
                            </div>
                            <div class="row " >
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputText3" class="form-label">Doctor Degree</label>
                                        <input type="text" class="form-control" id="exampleInput3" onChange={(e) => setDegree(e.target.value)} value={degree} />
                                    </div>

                                </div>
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputText4" class="form-label">Doctor Speciality</label>
                                        {/* <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea> */}
                                        <input type="text" class="form-control" id="exampleInput4" onChange={(e) => setSpeciality(e.target.value)} value={speciality} />
                                    </div>
                                </div>
                            </div>
                            <div class="row " >
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputText5" class="form-label">Doctor Date of Birth</label>
                                        <input type="date" class="form-control" id="exampleInput5" onChange={(e) => setDob(e.target.value)} value={dob} />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div class="mb-3">
                                        <label for="exampleInputText6" class="form-label">Doctor Address</label>
                                        {/* <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea> */}
                                        <input type="textarea" class="form-control" id="exampleInput6" onChange={(e) => setAddress(e.target.value)} value={address} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorProfile