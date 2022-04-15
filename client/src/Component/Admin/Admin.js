import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard'
import AdminNav from './AdminNav'

export default class Admin extends Component {
    render() {
        return (
            <>
                {/* <Router> */}
                    <AdminNav/>
                    <Routes>
                        <Route path='/dashboard' element={<><AdminDashboard /></>} />
                    </Routes>
                {/* </Router> */}
            </>
        )
    }
}
