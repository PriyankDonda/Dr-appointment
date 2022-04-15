import React, { useState } from 'react'
import { Button, Modal, Container, Row, Col } from 'react-bootstrap'

function PatientViewA({ data, onClose, updateDashboard }) {
    // const [state,dispatch] = useReducer(adreducer,adshow)
    const [show, setShow] = useState(true);

    const handleClose = () => { setShow(false); onClose(); }
    const handleShow = () => setShow(true);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row> <Col className='text-center fs-4'>Patient Details</Col> </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Patient Name</Col>
                            <Col >{data.patient.first_name} {data.patient.last_name}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Contact No.</Col>
                            <Col >{data.patient.phone_no}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Address</Col>
                            <Col >{data.patient.address}</Col>
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
                            <Col >{new Date(data.doctor_schedule.date).getDate()}-{new Date(data.doctor_schedule.date).getMonth()}-{new Date(data.doctor_schedule.date).getFullYear()}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Appointment Day</Col>
                            <Col >{data.doctor_schedule.day}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Appointment Time</Col>
                            <Col >{data.doctor_schedule.start_time}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Reason for Appointment</Col>
                            <Col >{data.reason}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='fw-bold text-end'>Doctor Comment</Col>
                            <Col >
                                <Col >{data.doctor_comment}</Col>
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={updateComment}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PatientViewA

