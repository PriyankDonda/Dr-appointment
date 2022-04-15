import React, { useEffect, useState } from 'react'
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap'

function DoctorCreateSchedule({ closeCreate, updateDashboard, currentSchedule, title, btnTitle }) {
    // const [state,dispatch] = useReducer(adreducer,adshow)
    const [show, setShow] = useState(true);

    const handleClose = () => { setShow(false); closeCreate(); }
    const handleShow = () => setShow(true);

    const [date, setDate] = useState(new Date())
    const [start_time, setSTime] = useState('10:30')
    const [end_time, setETime] = useState('11:30')
    const [average_time, setATime] = useState('10')

    const handleAdd = async () => {
        // e.preventDefault()
        console.log(date, start_time, end_time, average_time)
        const res = await fetch('/doctor/schedule', {
            method: "POST",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ date, start_time, end_time, average_time })
        })
        const data = res.json()

        console.log(data)
        if (res.status !== 201 || !data) {
            window.alert("Invalid Credentials")
        }
        else {
            // window.alert("Doctor created...")
            updateDashboard()
            handleClose()
        }
    }

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/doctor/schedule/${currentSchedule._id}`,{
                method: "PATCH",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ date, start_time, end_time, average_time })
            })

            if (res.status !== 200) {
                window.alert("Invalid Data")
                throw new Error(res.error)
            }
            else {
                // window.alert("Doctor Updated...")
                updateDashboard()
                handleClose()
            }
        } catch (error) {
            console.log('error : ', error)
        }
    }

    useEffect(() => {
        // console.log('curr schedule : ',currentSchedule)
        if (currentSchedule!==null) {
            setDate(new Date(currentSchedule.date))
            setSTime(currentSchedule.start_time)
            setETime(currentSchedule.end_time)
            setATime(currentSchedule.average_time)
        }
    }, [])

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

            <Modal size="sm-down" show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputDate">Schedule Date <i style={{ color: 'red' }}>*</i></Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        id="inputDate"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </>
                            </Col>
                        </Row>
                        <hr style={{ color: 'white' }} />
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputSTime">Start Time <i style={{ color: 'red' }}>*</i></Form.Label>
                                    <Form.Control
                                        required
                                        type="time"
                                        id="inputSTime"
                                        value={start_time}
                                        onChange={(e) => setSTime(e.target.value)}
                                    />
                                </>
                            </Col>
                        </Row>
                        <hr style={{ color: 'white' }} />
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputETime">End Time <i style={{ color: 'red' }}>*</i></Form.Label>
                                    <Form.Control
                                        required
                                        type="time"
                                        id="inputETime"
                                        value={end_time}
                                        onChange={(e) => setETime(e.target.value)}
                                    />
                                </>
                            </Col>
                        </Row><hr style={{ color: 'white' }} />
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputATime">Average Consulting Time <i style={{ color: 'red' }}>*</i></Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="inputATime"
                                        value={average_time}
                                        onChange={(e) => setATime(e.target.value)}
                                    />
                                </>
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { btnTitle === 'Add' ? handleAdd() : handleUpdate() }}>
                        {btnTitle}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DoctorCreateSchedule

