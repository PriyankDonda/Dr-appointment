import React, {useState} from 'react'
import {Button,Modal,Container,Row,Col} from 'react-bootstrap'

function ADView({doctor,onClose}) {
    // const [state,dispatch] = useReducer(adreducer,adshow)
    const [show, setShow] = useState(true);
  
    const handleClose = () => {setShow(false); onClose();}
    const handleShow = () => setShow(true);
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Doctor Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
          <Container>
          <Row>
            <Col className='fw-bold'>Doctor Name</Col>
            <Col >{doctor.name}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold'>Doctor Email Address</Col>
            <Col >{doctor.email}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold'>Doctor Phone No.</Col>
            <Col >{doctor.phone_no}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold'>Doctor Qualification</Col>
            <Col >{doctor.degree}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold'>Doctor Speciality</Col>
            <Col >{doctor.speciality}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold'>Doctor Date of Birth</Col>
            <Col >{doctor.dob}</Col>
          </Row>
          <hr/>
          <Row>
            <Col className='fw-bold'>Doctor Address</Col>
            <Col >{doctor.address}</Col>
          </Row>
        </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ADView

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
