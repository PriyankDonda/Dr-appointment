import React, { useEffect, useContext } from 'react'
import {useNavigate} from 'react-router-dom'

import {UserContext} from '../../App'

function DoctorLogout() {
    const {state,dispatch} = useContext(UserContext)

    const navigate = useNavigate()
    useEffect(()=>{
        fetch('/doctor/logout',{
            method: "POST",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
            // credentials: "include"
        }).then((res)=>{
            dispatch({type:"USER",payload:false})
            navigate('/doctor/login')
            if (!res.status === 200) {
                throw new Error(res.error)
              }
        }).catch((err)=>{
            console.log(err)
        })
    })    

  return (
    <div>DoctorLogout</div>
  )
}

export default DoctorLogout