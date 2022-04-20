import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import ADView from './ADView'
// import ADCreateDoctor from './ADCreateDoctor'

import { UserContext } from '../../App'

function AdminDoctorSchedule() {
  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([])
  const [filter, setFilter] = useState([])
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState([])
  const [currpage, setCurrpage] = useState(1)
  
  const [currentSchedule, setCurrentSchedule] = useState({})
  const changeCurrentSchedule = () => setCurrentSchedule({})
  const [addSchedule, setAddSchedule] = useState(false)
  const [currUpdateSchedule, setCurrUpdateSchedule] = useState({})
  const closeAddButton = () => { setAddSchedule(false); setCurrUpdateSchedule({}); }

  const checklogedin = async () => {
    try {
      const res = await fetch('/admin/schedules', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json()
      // console.log('data : ',data)

      if (res.status !== 200) {
        throw new Error(res.error)
      }

      dispatch({ type: "USER", payload: true })
      setSchedules([...data])
      // setFilter([...data])

      let pages = Math.ceil(data.length / limit)
      let pagearr = []
      for (let i = 1; i <= pages; i++) {
        pagearr.push(i)
      }
      setPages(pagearr)
      let si = (currpage - 1) * limit
      let ei = si + limit
      let filterArr = data.slice(si, ei)
      setFilter([...filterArr])
      console.log('updated....')
    } catch (e) {
      console.log('error : ', e)
      navigate('/admin/login')
    }
  }

  const delSchedule = async (id) => {
    try {
      const res = await fetch(`/admin/schedules/${id}`, {
        method: "DELETE",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      // const data = await res.json()

      // console.log('deleted : ',data)
      if (res.status !== 200) {
        throw new Error(res.error)
      }

      checklogedin()
    } catch (error) {
      console.log('error : ', error)
    }
  }

  useEffect(() => {
    checklogedin()
  }, [])

  useEffect(() => {
    let pages = Math.ceil(schedules.length / limit)
    if (pages < currpage) {
      setCurrpage(1)
    }
    let pagearr = []
    for (let i = 1; i <= pages; i++) {
      pagearr.push(i)
    }
    setPages(pagearr)
    let si = (currpage - 1) * limit
    let ei = si + limit
    // let filterArr = filter.slice(si, ei)
    setFilter([...schedules.slice(si, ei)])
  }, [limit, currpage])

  useEffect(() => {
    console.log(search)
    if (search === '') {
      setFilter(schedules)
    }
    else {
      let temp = schedules.filter((data) => {
        let name = data.name.toLowerCase()
        let day = data.day.toLowerCase()
        return name.includes(search.toLowerCase()) || day.includes(search.toLowerCase())
      })
      setFilter([...temp])
    }
  }, [search])

  return (
    <>
    <div className='container-box'>
        <div class="card shadow">
          <div class="card-header" style={{display:'flex'}}>
            Doctor-Schedules List
            <i class="fa-solid fa-arrows-rotate" onClick={()=>setFilter(schedules)} style={{marginLeft:'auto',marginTop:'4px',cursor:'pointer'}}></i>
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
                      <th scope="col">Schedule Date</th>
                      <th scope="col">Schedule Day</th>
                      <th scope="col text-center">Start Time</th>
                      <th scope="col text-center">End Time</th>
                      <th scope="col">Consulting Time</th>
                      <th scope="col text-center">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filter.map((schedule) => (
                        <tr key={schedule._id}>
                          <td>{schedule.name}</td>
                          <td>{new Date(schedule.date).getDate()}-{new Date(schedule.date).getMonth()}-{new Date(schedule.date).getFullYear()}</td>
                          <td>{schedule.day}</td>
                          <td>{schedule.start_time}</td>
                          <td>{schedule.end_time}</td>
                          <td>{schedule.average_time} Minute</td>
                          <td>{
                            schedule.schedule_status === true ?
                              <button type="button" class="btn btn-primary col-10" > Active </button>
                              : <button type="button" class="btn btn-danger col-10" >InActive</button>
                              // <button type="button" class="btn btn-primary col-10" onClick={()=>updateStatus(schedule._id,schedule.status)}> Active </button>
                              // : <button type="button" class="btn btn-danger col-10" onClick={()=>updateStatus(schedule._id,schedule.status)}>InActive</button>
                          }</td>
                          <td><div>
                            {/* <button type="button" class="btn btn-info action-button" onClick={() => setCurrentDoctor(doctor)} onclose={() => setCurrentDoctor({})}><i class="fa-solid fa-eye"></i></button>
                            {currentDoctor._id === doctor._id ? <ADView doctor={currentDoctor} onClose={changeCurrentDoctor} /> : null}
                            <button type="button" class="btn btn-warning action-button" onClick={() => setCurrUpdateDoctor(doctor)}><i class="fa-solid fa-pen-to-square"></i></button>
                            {currUpdateDoctor._id === doctor._id ? <ADCreateDoctor closeCreate={closeAddButton} updateDashboard={checklogedin} currDoctor={currUpdateDoctor} title={'Edit Doctor'} btnTitle={'Edit'} /> : null} */}
                            <button type="button" class="btn btn-danger action-button px-3" onClick={() => delSchedule(schedule._id)}><i class="fa-solid fa-xmark"></i></button>
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

export default AdminDoctorSchedule