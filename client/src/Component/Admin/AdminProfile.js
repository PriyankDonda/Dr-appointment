import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

function AdminProfile() {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate();

  const [profile, setProfile] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone_no, setPhoneno] = useState('')
  const [hName, setHName] = useState('')
  const [address, setAddress] = useState('')

  const fillData = (data) => {
    setName(data.name)
    setEmail(data.email)
    setHName(data.hospital_name)
    setAddress(data.hospital_address)
    setPhoneno(data.hospital_contact_no)
    setPassword('')
  }

  const checklogedin = async () => {
    try {
      const res = await fetch('/admin/Profile', {
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
      navigate('/admin/login')
    }
  }
  useEffect(() => {
    checklogedin()
  }, [])

  const handleUpdate = async () => {
    try {
      const res = await fetch('/admin/Profile', {
        method: "PATCH",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ name: name, email: email, password, hospital_name: hName, hospital_address: address, hospital_contact_no: phone_no })
      })
      if (res.status !== 200) {
        window.alert("Invalid Data")
        throw new Error(res.error)
      }
      else {
          window.alert("Updated Successfully!")
          const data = await res.json()
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
            <button type="button" class="btn btn-primary" onClick={()=>handleUpdate()} style={{ marginLeft: 'auto', marginTop: '4px', cursor: 'pointer' }}>Edit</button>
            {/* <i class="fa-solid fa-arrows-rotate" onClick={() => setFilter(doctors)} style={{ marginLeft: 'auto', marginTop: '4px', cursor: 'pointer' }}></i> */}
          </div>
          <div class="card-body">
            <div class="container">
              <div class="mb-3">
                <label for="exampleInputText1" class="form-label">Admin Name</label>
                <input type="text" class="form-control" id="exampleInput1" onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Admin Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Your password must be 8-20 characters long' onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <div class="mb-3">
                <label for="exampleInputText3" class="form-label">Hospital Name</label>
                <input type="text" class="form-control" id="exampleInput3" onChange={(e) => setHName(e.target.value)} value={hName} />
              </div>
              <div class="mb-3">
                <label for="exampleInputText4" class="form-label">Hospital Address</label>
                {/* <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea> */}
                <input type="textarea" class="form-control" id="exampleInput4" onChange={(e) => setAddress(e.target.value)} value={address} />
              </div>
              <div class="mb-3">
                <label for="exampleInputText5" class="form-label">Hospital Contact No.</label>
                <input type="text" class="form-control" id="exampleInput5" onChange={(e) => setPhoneno(e.target.value)} value={phone_no} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProfile