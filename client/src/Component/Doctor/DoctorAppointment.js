import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DoctorUA from './DoctorUA'

import { UserContext } from '../../App'

function DoctorAppointment() {
  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();
  const [appointments, setAppointmet] = useState([])
  const [filter, setFilter] = useState([])
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState([])
  const [currpage, setCurrpage] = useState(1)
  const [currentAppointment, setCurrentAppointment] = useState({})
  const changeCurrentAppointment = () => setCurrentAppointment({})

  const getappointment = async (id) => {
    const res = await fetch(`/doctor/appointments/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json()
    const datas = appointments
    datas.push(data)
    setAppointmet([...datas])
    setFilter([...datas])

    return data
  }

  const checklogedin = async () => {
    try {
      const res = await fetch('/doctor/appointments', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json()
      // console.log('appointment data : ',data)

      if (res.status !== 200) {
        throw new Error(res.error)
      }

      const datas = data.map((data) => {
        const temp = getappointment(data._id)
        return temp
      })
      console.log('appointments data : ', appointments)

      dispatch({ type: "USER", payload: true })
      // setAppointmet([...data])
      // setFilter([...appointments])
      console.log('appointments filter : ', filter)

      let pages = Math.ceil(data.length / limit)
      let pagearr = []
      for (let i = 1; i <= pages; i++) {
        pagearr.push(i)
      }
      setPages(pagearr)
      let si = (currpage - 1) * limit
      let ei = si + limit
      // let filterArr = appointments.slice(si, ei)
      // setFilter([...filterArr])
      // console.log('pages', pages)
      console.log('updated....')
    } catch (e) {
      console.log('error : ', e)
      navigate('/doctor/login')
    }
  }

  useEffect(() => {
    checklogedin()
  }, [])

  useEffect(() => {
    let pages = Math.ceil(appointments.length / limit)
    let pagearr = []
    for (let i = 1; i <= pages; i++) {
      pagearr.push(i)
    }
    setPages(pagearr)
    let si = (currpage - 1) * limit
    let ei = si + limit
    let filterArr = appointments.slice(si, ei)
    setFilter([...filterArr])
    console.log('pages...', pages)
  }, [limit, currpage])

  useEffect(() => {
    console.log(search)
    if (search === '') {
      setFilter(appointments)
    }
    else {
      let temp = appointments.filter((data) => {
        let name = (data.patient.first_name+" "+data.patient.last_name).toLowerCase()
        let day = data.doctor_schedule.day.toLowerCase()
        let status = data.status.toLowerCase()
        return name.includes(search.toLowerCase()) || day.includes(search.toLowerCase()) || status.includes(search.toLowerCase())
      })
      setFilter([...temp])
    }
  }, [search])


  return (
    <>
      <div className='container-box'>
        <div class="card shadow">
          <div class="card-header" style={{display:'flex'}}>
            Appointment List
            <i class="fa-solid fa-arrows-rotate" onClick={()=>setFilter(appointments)} style={{marginLeft:'auto',marginTop:'4px',cursor:'pointer'}}></i>
          </div>
          <div class="card-body">
            <div class="container">
              <div class="row " >
                <div class="col" style={{ display: 'flex', alignItem: 'center' }}>
                  <h6 class="card-title fs-6" style={{ margin: 'auto 0' }}>Show Entries :</h6>
                  <select class="form-select form-select-sm mx-2" onChange={(e) => setLimit(e.target.value)} style={{ width: '5rem' }} aria-label="Default select example">
                    {/* <option value="5">5</option> */}
                    <option defaultValue={limit} value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className='col'>
                  <input class="form-control me-2" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                  {/* <input type="text" class="input-group-text col favourites-search" placeholder='Search' /> */}
                </div>
                {/* <div class="col-1 ">
                  <button type="button" class="btn btn-success" onClick={() => setAddDoctor(true)}>+</button>
                  {addDoctor ? <ADCreateDoctor closeCreate={closeAddButton} updateDashboard={checklogedin} currDoctor={null} title={'Add Doctor'} btnTitle={'Add'} /> : null}
                </div> */}
              </div>

              <div className='row' style={{ marginTop: '20px' }}>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Patient Name</th>
                      <th scope="col">Appointment Date</th>
                      <th scope="col">Appointment Time</th>
                      <th scope="col text-center">Appointment Day</th>
                      <th scope="col">Consulting Time</th>
                      <th scope="col text-center">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filter.map((ap) => (
                        <tr key={ap._id}>
                          <td>{ap.patient.first_name} {ap.patient.last_name}</td>
                          <td>{new Date(ap.doctor_schedule.date).getDate()}-{new Date(ap.doctor_schedule.date).getMonth()}-{new Date(ap.doctor_schedule.date).getFullYear()}</td>
                          <td>{ap.doctor_schedule.start_time}</td>
                          <td>{ap.doctor_schedule.day}</td>
                          <td>{ap.time} Minute</td>
                          <td>{
                              // <button type="button" class="btn btn-primary col-10" > {ap.status} </button>
                              ap.status === "Booked" ?
                              <span class="p-1 px-2 rounded bg-warning text-white">Booked</span> :
                              ap.status === "In Process" ?
                              <span class="p-1 px-2 rounded bg-primary text-white">In Process</span>:
                              ap.status === "Completed" ?
                              <span class="p-1 px-2 rounded bg-success text-white">Completed</span>:
                              <span class="p-1 px-2 rounded bg-danger text-white">Cancel</span>
                          }</td>
                          <td><div>
                            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Launch demo modal
                            </button> */}
                            <button type="button" class="btn btn-info action-button" onClick={() => setCurrentAppointment(ap)} onClose={() => setCurrentAppointment({})}><i class="fa-solid fa-eye"></i></button>
                            {currentAppointment._id === ap._id ? <DoctorUA data={currentAppointment} onClose={changeCurrentAppointment} updateDashboard={checklogedin}/> : null}
                            {/* <button type="button" class="btn btn-warning action-button" onClick={() => setCurrUpdateDoctor(doctor)}><i class="fa-solid fa-pen-to-square"></i></button>
                            {currUpdateDoctor._id === doctor._id ? <ADCreateDoctor closeCreate={closeAddButton} updateDashboard={checklogedin} currDoctor={currUpdateDoctor} title={'Edit Doctor'} btnTitle={'Edit'} /> : null}
                            <button type="button" class="btn btn-danger action-button px-3" onClick={() => delDoctor(doctor._id)}><i class="fa-solid fa-xmark"></i></button> */}
                          </div></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  {
                    pages.map((page) => (
                      currpage === page ?
                        <li className="page-item active"><a class="page-link" onClick={() => setCurrpage(page)}>{page}</a></li>
                        : <li className="page-item"><a class="page-link" onClick={() => setCurrpage(page)}>{page}</a></li>
                    ))
                  }
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorAppointment