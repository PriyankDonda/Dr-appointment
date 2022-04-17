import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PatientMakeA from './PatientMakeA'

import { UserContext } from '../../App'

function PatientBookA() {
  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();
  const [schedules, setSchedule] = useState([])
  const [patient, setpatient] = useState({})
  const [filter, setFilter] = useState([])
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState([])
  const [currpage, setCurrpage] = useState(1)
  const [currentSchedule, setCurrentSchedule] = useState({})
  const changeCurrentSchedule = () => setCurrentSchedule({})

  // const getschedule = async (id) => {
  //   const res = await fetch(`/patient/book-appoinments/${id}`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     credentials: "include"
  //   })
  //   const data = await res.json()
  //   const datas = schedules
  //   datas.push(data)
  //   setSchedule([...datas])
  //   setFilter([...datas])

  //   return data
  // }

  const checklogedin = async () => {
    try {
      fetch('/patient/book-appoinments', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      }).then(res => res.json()).then(data => {



        // let data = await res.json()
        console.log(' data :: ', data)

        if (res.status !== 200) {
          throw new Error(res.error)
        }

        setpatient(data.patient)
        console.log(patient)
        // data = data.schedules
        // let datas = []
        // const fetchdata = async () =>{
        // datas = data.map((data) => {
        //   const temp = getschedule(data._id)
        //   return temp
        // })
        // }
        // setTimeout(() => { fetchdata(); }, 3000);

        dispatch({ type: "USER", payload: true })
        setSchedule([...data.schedules])
        console.log('schedules : ', data.schedules)
        console.log('schedules data : ', schedules)
        // setFilter([...data])

        let pages = Math.ceil(data.schedules.length / limit)
        let pagearr = []
        for (let i = 1; i <= pages; i++) {
          pagearr.push(i)
        }
        setPages(pagearr)
        let si = (currpage - 1) * limit
        let ei = si + limit

        let filterArr = schedules.slice(si, ei)
        setFilter([...filterArr])
        console.log('schedules filter : ', filter)
        // console.log('pages', pages)
        // console.log('updated....')
      })
    } catch (e) {
      console.log('error : ', e)
      navigate('/patient/login')
    }
  }

  useEffect(() => {
    checklogedin()
    console.log('loaded ::::', schedules)
  }, [])

  useEffect(() => {
    let pages = Math.ceil(schedules.length / limit)
    let pagearr = []
    for (let i = 1; i <= pages; i++) {
      pagearr.push(i)
    }
    setPages(pagearr)
    let si = (currpage - 1) * limit
    let ei = si + limit
    let filterArr = schedules.slice(si, ei)
    setFilter([...filterArr])
    // console.log('pages...', pages)
  }, [limit, currpage])

  useEffect(() => {
    console.log(search)
    if (search === '') {
      setFilter(schedules)
    }
    else {
      let temp = schedules.filter((data) => {
        let name = (data.doctor.name).toLowerCase()
        let day = data.day.toLowerCase()
        let degree = data.doctor.degree.toLowerCase()
        let speciality = data.doctor.speciality
        return name.includes(search.toLowerCase()) || day.includes(search.toLowerCase()) || degree.includes(search.toLowerCase()) || speciality.includes(search.toLowerCase())
      })
      setFilter([...temp])
    }
  }, [search])


  return (
    <>
      {console.log('react : ', schedules, '\n filter : ', filter)}
      <div className='container-box'>
        <div class="card shadow">
          <div class="card-header" style={{ display: 'flex' }}>
            Doctor Schedules List
            <i class="fa-solid fa-arrows-rotate" onClick={() => setFilter(schedules)} style={{ marginLeft: 'auto', marginTop: '4px', cursor: 'pointer' }}></i>
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
                      <th scope="col">Doctor Name</th>
                      <th scope="col">Doctor Education</th>
                      <th scope="col">Doctor Speciality</th>
                      <th scope="col">Appointment Date</th>
                      <th scope="col text-center">Appointment Day</th>
                      <th scope="col">Available Time</th>
                      {/* <th scope="col">Consulting Time</th> */}
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filter.map((schedule) => (
                        <tr key={schedule._id}>
                          <td>{schedule.doctor.name}</td>
                          <td>{schedule.doctor.degree}</td>
                          <td>{schedule.doctor.speciality}</td>
                          <td>{new Date(schedule.date).getDate()}-{new Date(schedule.date).getMonth()}-{new Date(schedule.date).getFullYear()}</td>
                          <td>{schedule.day}</td>
                          <td>{schedule.start_time} - {schedule.end_time}</td>
                          {/* <td>{schedule.time} Minute</td> */}
                          <td><div>
                            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Launch demo modal
                            </button> */}
                            <button type="button" class="btn btn-primary action-button" onClick={() => setCurrentSchedule(schedule)} onClose={() => setCurrentSchedule({})}>Get Appointment</button>
                            {currentSchedule._id === schedule._id ? <PatientMakeA data={currentSchedule} patient={patient} onClose={changeCurrentSchedule} updateDashboard={checklogedin} /> : null}
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

export default PatientBookA