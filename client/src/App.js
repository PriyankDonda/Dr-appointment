import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminLogin from './Component/Admin/AdminLogin';
import AdminNav from './Component/Admin/AdminNav';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AdminDoctorList from './Component/Admin/AdminDoctorList';
import AdminPatient from './Component/Admin/AdminPatient';
import AdminDoctorSchedule from './Component/Admin/AdminDoctorSchedule';
import AdminAppointment from './Component/Admin/AdminAppointment';
import AdminProfile from './Component/Admin/AdminProfile';
import AdminLogout from './Component/Admin/AdminLogout';

import DoctorNav from './Component/Doctor/DoctorNav';
import DoctorLogin from './Component/Doctor/DoctorLogin';
import DoctorLogout from './Component/Doctor/DoctorLogout';
import DoctorSchedule from './Component/Doctor/DoctorSchedule';
import DoctorAppointment from './Component/Doctor/DoctorAppointment';
import DoctorProfile from './Component/Doctor/DoctorProfile';

import PatientNav from './Component/Patient/PatientNav';
import Home from './Component/Patient/Home';
import PatientBookA from './Component/Patient/PatientBookA';
import PatientAppointments from './Component/Patient/PatientAppointments';
import AboutUs from './Component/Patient/AboutUs';
import PatientLogin from './Component/Patient/PatientLogin';
import PatientSignUp from './Component/Patient/PatientSignUp';
import PatientLogout from './Component/Patient/PatientLogout';
import PatientProfile from './Component/Patient/PatientProfile';

import { createContext, useReducer } from 'react';
import { intialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext()

function App() {
  const [state,dispatch] = useReducer(reducer,intialState)
  return (
    <>
    {
      console.log('state : ',state)
    }
    <UserContext.Provider value={{state,dispatch}}>
      <Router>

        <Routes>
          <Route path='/' element={<><PatientNav/><Home/></>}/>
          <Route path='/admin' element={<><AdminNav/><AdminDashboard/></>}/>
          <Route path='/admin/login' element={<><AdminNav/><AdminLogin/></>}/>
          <Route path='/admin/logout' element={<><AdminNav/><AdminLogout/></>}/>
          <Route path='/admin/dashboard' element={<><AdminNav/><AdminDashboard/></>}/>
          <Route path='/admin/doctor' element={<><AdminNav/><AdminDoctorList/></>}/>
          <Route path='/admin/patient' element={<><AdminNav/><AdminPatient/></>}/>
          <Route path='/admin/doctor-schedule' element={<><AdminNav/><AdminDoctorSchedule/></>}/>
          <Route path='/admin/appointment' element={<><AdminNav/><AdminAppointment/></>}/>
          <Route path='/admin/profile' element={<><AdminNav/><AdminProfile/></>}/>

          <Route path='/doctor' element={<><DoctorNav/><DoctorSchedule/></>}/>
          <Route path='/doctor/login' element={<><DoctorNav/><DoctorLogin/></>}/>
          <Route path='/doctor/logout' element={<><DoctorNav/><DoctorLogout/></>}/>
          <Route path='/doctor/doctor-schedule' element={<><DoctorNav/><DoctorSchedule/></>}/>
          <Route path='/doctor/appointment' element={<><DoctorNav/><DoctorAppointment/></>}/>
          <Route path='/doctor/profile' element={<><DoctorNav/><DoctorProfile/></>}/>

          <Route path='/patient' element={<><PatientNav/><Home/></>}/>
          <Route path='/patient/home' element={<><PatientNav/><Home/></>}/>
          <Route path='/patient/login' element={<><PatientNav/><PatientLogin/></>}/>
          <Route path='/patient/logout' element={<><PatientNav/><PatientLogout/></>}/>
          <Route path='/patient/signup' element={<><PatientNav/><PatientSignUp/></>}/>
          <Route path='/patient/book-appointment' element={<><PatientNav/><PatientBookA/></>}/>
          <Route path='/patient/appointment' element={<><PatientNav/><PatientAppointments/></>}/>
          <Route path='/patient/aboutus' element={<><PatientNav/><AboutUs/></>}/>
          <Route path='/patient/profile' element={<><PatientNav/><PatientProfile/></>}/>
        </Routes>
      </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
