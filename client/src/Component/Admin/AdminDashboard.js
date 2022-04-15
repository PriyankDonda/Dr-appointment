import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../../App'

function AdminDashboard() {
    // const { state, dispatch } = useContext(UserContext)

    return (
        <div>
            {/* <h3 className='display-6 page-name'>Dashboard</h3> */}

            <div className='dashboard-container' style={{
                display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
                padding: '1rem'
            }}>
                <div class="card mb-3 dashboard-card shadow" style={{ maxWidth: '400px' }}>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../../document.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h6 class="display-7 dashboard-card-title">TODAY TOTAL APPOINTMENT</h6>
                                <h5 class="display-5 " style={{ display: 'flex', justifyContent: 'center' }}>13</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-3 dashboard-card shadow" style={{ maxWidth: '400px' }}>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../../document.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h6 class="display-7 dashboard-card-title">YESTERDAY TOTAL APPOINTMENT</h6>
                                <h5 class="display-5 " style={{ display: 'flex', justifyContent: 'center' }}>30</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-3 dashboard-card shadow" style={{ maxWidth: '400px' }}>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../../document.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h6 class="display-7 dashboard-card-title">LAST 7 DAYS TOTAL APPOINTMENT</h6>
                                <h5 class="display-5 " style={{ display: 'flex', justifyContent: 'center' }}>289</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-3 dashboard-card shadow" style={{ maxWidth: '400px' }}>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../../document.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h6 class="display-7 dashboard-card-title">TOTAL APPOINTMENT TILL DATE</h6>
                                <h5 class="display-5 " style={{ display: 'flex', justifyContent: 'center' }}>4370</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-3 dashboard-card shadow" style={{ maxWidth: '400px' }}>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../../document.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h6 class="display-7 dashboard-card-title">TOTAL REGISTERED PATIENT</h6>
                                <h5 class="display-5" style={{ display: 'flex', justifyContent: 'center' }}>5000+</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard