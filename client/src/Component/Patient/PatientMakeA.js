import React, { useState, useEffect } from 'react'
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap'

function PatientMakeA({ data, onClose, updateDashboard, patient }) {
    // const [state,dispatch] = useReducer(adreducer,adshow)
    const [show, setShow] = useState(true);

    const handleClose = () => { setShow(false); onClose(); }
    const handleShow = () => setShow(true);

    const [reason, setReason] = useState('')

    const bookAppointment = async () => {
        try {
            const res = await fetch(`/patient/appointments`, {
                method: "POST",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ doctor:data.doctor._id, doctor_schedule: data._id, time: data.average_time, reason })
            })

            if (res.status !== 201) {
                window.alert("Invalid Data")
                throw new Error(res.error)
            }
            else {
                window.alert("Appointment Booked Successfully...")
                // updateDashboard()    //it create duplicate in fronted......
                handleClose()
            }
        } catch (error) {
            console.log('error : ', error)
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
        {console.log(patient)}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row> <Col className='text-center fs-4'>Patient Details</Col> </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Patient Name</Col>
                            <Col >{ patient.first_name} {patient.last_name}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Contact No.</Col>
                            <Col >{patient.phone_no}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Address</Col>
                            <Col >{patient.address}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='text-center fs-4'>Appointment Details</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Doctor Name</Col>
                            <Col >{data.doctor.name}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Appointment Date</Col>
                            <Col >{new Date(data.date).getDate()}-{new Date(data.date).getMonth()}-{new Date(data.date).getFullYear()}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Appointment Day</Col>
                            <Col >{data.day}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Appointment Time</Col>
                            <Col >{data.start_time} - {data.end_time}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold mb-2'>Reason for Appointment</Col>
                        </Row>
                        <Row>
                            <Col >
                                <Form.Control as="textarea" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={bookAppointment}>
                        Book
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PatientMakeA

