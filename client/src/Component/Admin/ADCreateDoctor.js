import React, { useEffect, useState } from 'react'
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap'

function ADCreateDoctor({ closeCreate, updateDashboard, currDoctor, title, btnTitle }) {
    // const [state,dispatch] = useReducer(adreducer,adshow)
    const [show, setShow] = useState(true);

    const handleClose = () => { setShow(false); closeCreate(); }
    const handleShow = () => setShow(true);
    const handleAdd = async () => {
        // e.preventDefault()
        console.log(email, password, name, phone_no, degree, speciality, address, dob)
        const res = await fetch('/admin/createdoctor', {
            method: "POST",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password, name, phone_no, degree, speciality, address, dob })
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
            const res = await fetch(`/admin/doctor/${currDoctor._id}`,{
                method: "PATCH",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password, name, phone_no, degree, speciality, address, dob })
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

    const [email, setEmail] = useState('1@gmail.com')
    const [password, setPassword] = useState('12345678')
    const [name, setName] = useState('testing')
    const [phone_no, setPhoneno] = useState('1234567890')
    const [degree, setDegree] = useState('random')
    const [speciality, setSpeciality] = useState('random consultant')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')

    useEffect(() => {
        // console.log('currdoctor : ',currDoctor)
        if (currDoctor!==null) {
            setEmail(currDoctor.email)
            // setPassword('')
            setName(currDoctor.name)
            setPhoneno(currDoctor.phone_no)
            setDegree(currDoctor.degree)
            setSpeciality(currDoctor.speciality)
            setAddress(currDoctor.address)
            setDob(currDoctor.dob)
        }
    }, [])

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

            <Modal size="lg" show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputEmail">Doctor Email Address <i style={{ color: 'red' }}>*</i></Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        id="inputEmail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    // placeholder='Doctor Email Address'
                                    />
                                </>
                            </Col>
                            <Col >
                                <Form.Label htmlFor="inputPassword">Password <i style={{ color: 'red' }}>*</i></Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    id="inputPassword"
                                    aria-describedby="passwordHelpBlock"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 8-20 characters long
                                </Form.Text>
                            </Col>
                        </Row>
                        <hr style={{ color: 'white' }} />
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputName">Doctor Name <i style={{ color: 'red' }}>*</i></Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="inputName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    // placeholder='Doctor Email Address'
                                    />
                                </>
                            </Col>
                            <Col >
                                <Form.Label htmlFor="inputPhone">Doctor Phone No. <i style={{ color: 'red' }}>*</i></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    id="inputPhone"
                                    value={phone_no}
                                    onChange={(e) => setPhoneno(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <hr style={{ color: 'white' }} />
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputDegree">Doctor Degree <i style={{ color: 'red' }}>*</i></Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="inputDegree"
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                    // placeholder='Doctor Email Address'
                                    />
                                </>
                            </Col>
                            <Col >
                                <Form.Label htmlFor="inputSpeciality">Doctor Speciality <i style={{ color: 'red' }}>*</i></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    id="inputSpeciality"
                                    value={speciality}
                                    onChange={(e) => setSpeciality(e.target.value)}
                                />
                            </Col>
                        </Row><hr style={{ color: 'white' }} />
                        <Row>
                            <Col >
                                <>
                                    <Form.Label htmlFor="inputAddress">Doctor Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="inputAddress"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    // placeholder='Doctor Email Address'
                                    />
                                </>
                            </Col>
                            <Col >
                                <Form.Label htmlFor="inputDob">Doctor Date of Birth</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="inputDob"
                                    aria-describedby="dobHelpBlock"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                                <Form.Text id="dobHelpBlock" muted>
                                    Date should be in formate of MM/DD/YYYY
                                </Form.Text>
                                {/* 05/08/2002 */}
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

export default ADCreateDoctor

