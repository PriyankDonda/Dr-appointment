import React, {useState, useEffect} from 'react'
import {Button,Modal,Container,Row,Col,Form} from 'react-bootstrap'

function ADAUpdate({data,onClose,updateDashboard}) {
    // const [state,dispatch] = useReducer(adreducer,adshow)
    const [show, setShow] = useState(true);
  
    const handleClose = () => {setShow(false); onClose();}
    const handleShow = () => setShow(true);

    const [comeToH, setComeToH] = useState(false)
    useEffect(()=>{
        setComeToH(data.patient_come_into_hospital)
    },[])

    const updateComeToH = async() =>{
        try {
            // console.log(comeToH)
            const res = await fetch(`/admin/appointment/${data._id}`,{
                method: "PATCH",
                headers: {
                    // Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ patient_come_into_hospital: comeToH, status: comeToH ? 'In Process' : 'Booked' })
            })

            if (res.status !== 200) {
                window.alert("Invalid Data")
                throw new Error(res.error)
            }
            else {
                // window.alert("status Updated...")
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
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Appointment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
          <Container>
        <Row> <Col className='text-center fs-4'>Patient Details</Col> </Row>
        <hr/>
          <Row>
            <Col className='fw-bold text-end'>Patient Name</Col>
            <Col >{data.patient.first_name} {data.patient.last_name}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Contact No.</Col>
            <Col >{data.patient.phone_no}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Address</Col>
            <Col >{data.patient.address}</Col>
          </Row>
          <hr/>
          <Row>
          <Col className='text-center fs-4'>Appointment Details</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Doctor Name</Col>
            <Col >{data.doctor.name}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Appointment Date</Col>
            <Col >{new Date(data.doctor_schedule.date).getDate()}-{new Date(data.doctor_schedule.date).getMonth()}-{new Date(data.doctor_schedule.date).getFullYear()}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Appointment Day</Col>
            <Col >{data.doctor_schedule.day}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Appointment Time</Col>
            <Col >{data.doctor_schedule.start_time}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Reason for Appointment</Col>
            <Col >{data.reason}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold text-end'>Patient come into Hostpital</Col>
            <Col >{data.patient_come_into_hospital===false ? 
                    <Form.Select aria-label="Default select example" onChange={(e)=>e.target.value==='true' ? setComeToH(true) : setComeToH(false)}>
                    <option value="false">--select--</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                  : 'YES'}</Col>
          </Row>
          {
              data.doctor_comment !== "" ?
              <Row>
            <Col className='fw-bold text-end'>Doctor Comment</Col>
            <Col >{data.doctor_comment}</Col>
          </Row>
          :null
          }
        </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateComeToH}>
              Save 
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ADAUpdate

