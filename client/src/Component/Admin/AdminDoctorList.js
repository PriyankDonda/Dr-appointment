import React, { useEffect, useState, useContext } from 'react'
// import { doctorList } from './DoctorList'
import { useNavigate } from 'react-router-dom'
import ADView from './ADView'
import ADCreateDoctor from './ADCreateDoctor'
// import { render } from 'react-dom'

import { UserContext } from '../../App'

function AdminDoctorList() {
  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([])
  const [filter, setFilter] = useState([])
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState([])
  const [currpage, setCurrpage] = useState(1)
  
  const [currentDoctor, setCurrentDoctor] = useState({})
  const changeCurrentDoctor = () => setCurrentDoctor({})
  const [addDoctor, setAddDoctor] = useState(false)
  const [currUpdateDoctor, setCurrUpdateDoctor] = useState({})
  const closeAddButton = () => { setAddDoctor(false); setCurrUpdateDoctor({}); }

  const checklogedin = async () => {
    try {
      const res = await fetch('/admin/doctor', {
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
      setDoctors([...data])
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

  const updateStatus = async (id,status) => {
    try {
      const res = await fetch(`/admin/doctor/${id}`, {
        method: "PATCH",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ status: !status })
      })

      if (res.status !== 200) {
        // window.alert("Invalid Credentials")
        throw new Error(res.error)
      }
      else {
        // window.alert("Doctor Updated...")
        checklogedin()
        // handleClose()
      }
    } catch (error) {
      console.log('error : ', error)
    }
  }

  const delDoctor = async (id) => {
    try {
      const res = await fetch(`/admin/doctor/${id}`, {
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
    let pages = Math.ceil(doctors.length / limit)
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
    setFilter([...doctors.slice(si, ei)])
  }, [limit, currpage])

  useEffect(() => {
    console.log(search)
    if (search === '') {
      setFilter(doctors)
    }
    else {
      let temp = doctors.filter((data) => {
        let name = data.name.toLowerCase()
        let speciality = data.speciality.toLowerCase()
        let status = data.status === true ? 'active' : 'inactive'
        return name.includes(search.toLowerCase()) || speciality.includes(search.toLowerCase()) || status.includes(search.toLowerCase())
      })
      setFilter([...temp])
    }
  }, [search])

  return (
    <>
      {/* {console.log(addDoctor)} */}
      {/* { */}
      <div className='container-box'>
        <div class="card shadow">
          <div class="card-header" style={{display:'flex'}}>
            Doctor List
            <i class="fa-solid fa-arrows-rotate" onClick={()=>setFilter(doctors)} style={{marginLeft:'auto',marginTop:'4px',cursor:'pointer'}}></i>
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
                <div class="col-1 ">
                  <button type="button" class="btn btn-success" onClick={() => setAddDoctor(true)}>+</button>
                  {addDoctor ? <ADCreateDoctor closeCreate={closeAddButton} updateDashboard={checklogedin} currDoctor={null} title={'Add Doctor'} btnTitle={'Add'} /> : null}
                </div>
              </div>

              <div className='row' style={{ marginTop: '20px' }}>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Doctor Name</th>
                      <th scope="col">Email Address</th>
                      <th scope="col">Phone No.</th>
                      <th scope="col text-center">Speciality</th>
                      <th scope="col text-center">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filter.map((doctor) => (
                        <tr key={doctor._id}>
                          <td>{doctor.name}</td>
                          <td>{doctor.email}</td>
                          <td>{doctor.phone_no}</td>
                          <td>{doctor.speciality}</td>
                          <td>{
                            doctor.status === true ?
                              <button type="button" class="btn btn-primary col-10" onClick={()=>updateStatus(doctor._id,doctor.status)}> Active </button>
                              : <button type="button" class="btn btn-danger col-10" onClick={()=>updateStatus(doctor._id,doctor.status)}>InActive</button>
                          }</td>
                          <td><div>
                            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              Launch demo modal
                            </button> */}
                            <button type="button" class="btn btn-info action-button" onClick={() => setCurrentDoctor(doctor)} onclose={() => setCurrentDoctor({})}><i class="fa-solid fa-eye"></i></button>
                            {/* <DoctorView doctor={currentDoctor} /> */}
                            {/* {currentDoctor._id===doctor._id ? <DoctorView doctor={currentDoctor} /> : null} */}
                            {currentDoctor._id === doctor._id ? <ADView doctor={currentDoctor} onClose={changeCurrentDoctor} /> : null}
                            <button type="button" class="btn btn-warning action-button" onClick={() => setCurrUpdateDoctor(doctor)}><i class="fa-solid fa-pen-to-square"></i></button>
                            {currUpdateDoctor._id === doctor._id ? <ADCreateDoctor closeCreate={closeAddButton} updateDashboard={checklogedin} currDoctor={currUpdateDoctor} title={'Edit Doctor'} btnTitle={'Edit'} /> : null}
                            <button type="button" class="btn btn-danger action-button px-3" onClick={() => delDoctor(doctor._id)}><i class="fa-solid fa-xmark"></i></button>
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
      {/* } */}
    </>
  )
}

export default AdminDoctorList

// function DoctorView({ doctor }) {
//   return (
//     <>
//       {console.log('doctorview : ', doctor.name)}
//       <div class="modal fade" id="ADoctorDetail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div class="modal-dialog modal-dialog-centered">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h5 class="modal-title" id="exampleModalLabel">Doctor Details</h5>
//               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//               <div class="container-fluid">

//                 <div class="row">
//                   <div class="col fw-bold">Doctor Name</div>
//                   <div class="col">{doctor.name}</div>
//                 </div><hr />
//                 <div class="row">
//                   <div class="col fw-bold">Doctor Email Address</div>
//                   <div class="col">{doctor.email}</div>
//                 </div><hr />
//                 <div class="row">
//                   <div class="col fw-bold">Doctor Phone No.</div>
//                   <div class="col">{doctor.phone_no}</div>
//                 </div><hr />
//                 <div class="row">
//                   <div class="col fw-bold">Doctor Qualification</div>
//                   <div class="col">{doctor.degree}</div>
//                 </div><hr />
//                 <div class="row">
//                   <div class="col fw-bold">Doctor Speciality</div>
//                   <div class="col">{doctor.speciality}</div>
//                 </div><hr />
//                 <div class="row">
//                   <div class="col fw-bold">Doctor Date of Birth</div>
//                   <div class="col">{doctor.dob}</div>
//                 </div><hr />
//                 <div class="row">
//                   <div class="col fw-bold">Doctor Address</div>
//                   <div class="col">{doctor.address}</div>
//                 </div>

//               </div>
//             </div>
//             <div class="modal-footer">
//               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               {/* <button type="button" class="btn btn-primary">Save changes</button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
