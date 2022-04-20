/**
 * Environmental Settings simulator for Building 1.
 * It is responsible for allowing a user to override
 * imaginary environmental settings to create a simulation
 * of the real environment.
 * 
 * @author Kamil Kawka
 * @param {string} deviceName - The name of the device.
 * 
 */

 import React from 'react';
 import { useState, useEffect } from 'react';
 import { Card, Modal, Form, FormLabel, Button } from 'react-bootstrap';
 import 'bootstrap/dist/css/bootstrap.min.css';
 import deviceStore from '../../../stores/deviceStore';
 
 
 export default function EnvironmentalSettings() {
     
     const [envSettingsState, setEnvSettingsState] = useState({});
 
     const [show, setShow] = useState(false);
 
     const handleShow = () => setShow(true);
     const handleClose = () => setShow(false);
 
     useEffect(() => deviceStore.onUpdateDevice("Building", (snapshot) => setEnvSettingsState(snapshot.val())), []);
 
     /* 
     * Function handles user input from the simulator,
     * converts it to the correct format and updates
     * the database if the values are in the correct ranges.
     */
     async function handleSubmit(e) {
         e.preventDefault();
         let setpoint = getElementVal('setpoint');
         let inTemp = getElementVal('inTemp');
         let outTemp = getElementVal('outTemp');
         let inHumdity = getElementVal('inHumidity');
         let outHumidity = getElementVal('outHumidity');
         let occupancy = getElementVal('occupancy');
         let co2 = getElementVal('co2Levels');
         
         // Check if the values of the setpoint are in the correct ranges.
         if (setpoint > 30 || setpoint < 15 || setpoint === '') {
             alert('Temperature setpoint must be between 15 and 30 degrees');
             return;
         }
 
         // Check if the values of the indoor temperature are in the correct ranges.
         if (inTemp > 35 || inTemp < 0 || inTemp === '') {
             alert('Indoor temperature must be between 0 and 35 degrees');
             return;
         }
 
         // Check if the values of the outdoor temperature are in the correct ranges.
         if (outTemp > 50 || outTemp < -50 || outTemp === '') {
             alert('Outdoor temperature must be between -50 and 50 degrees');
             return;
         }
 
         // Check if the values of the indoor humidity are in the correct ranges.
         if (inHumdity > 100 || inHumdity < 0 || inHumdity === '') {
             alert('Indoor humidity must be between 0 and 100 percent');
             return;
         }
 
         // Check if the values of the outdoor humidity are in the correct ranges.
         if (outHumidity > 100 || outHumidity < 0 || outHumidity === '') {
             alert('Outdoor humidity must be between 0 and 100 percent');
             return;
         }
 
         // Check if the values of the occupancy are in the correct ranges.
         if (occupancy > 100 || occupancy < 0 || occupancy === '') {
             alert('Occupancy must be between 0 and 100 percent');
             return;
         }
 
         deviceStore.updateDevice("Building", "", {
             'CO2 Levels': co2,
             'Temperature Setpoint': parseInt(setpoint),
             'Indoor Temperature': parseInt(inTemp),
             'Outdoor Temperature': parseInt(outTemp),
             'Indoor Humidity': parseInt(inHumdity),
             'Outdoor Humidity': parseInt(outHumidity),
             'Occupancy': parseInt(occupancy),
         })
     }
 
     // helper arrow function to get the value of an element.
     const getElementVal = (id) => {
         return document.getElementById(id).value;
     };
 
     return (
         <>
             <Card>
                 <Card.Header>
                 <Card.Title>Environmental Data</Card.Title>
                 </Card.Header>
                 <Card.Body>
                     <Card.Text><strong>Temperature Setpoint:</strong> { envSettingsState['Temperature Setpoint'] } °C</Card.Text>
                     <Card.Text><strong>Indoor Temperature:</strong> { envSettingsState['Indoor Temperature'] } °C</Card.Text>
                     <Card.Text><strong>Outdoor Temperature:</strong> { envSettingsState['Outdoor Temperature'] } °C</Card.Text>
                     <Card.Text><strong>Indoor Humidity:</strong> { envSettingsState['Indoor Humidity'] } %</Card.Text>
                     <Card.Text><strong>Outdoor Humidity:</strong> { envSettingsState['Outdoor Humidity'] } %</Card.Text>
                     <Card.Text><strong>Occupancy:</strong> { envSettingsState['Occupancy'] } %</Card.Text>
                     <Card.Text><strong>CO2 Level:</strong> { envSettingsState['CO2 Levels'] } </Card.Text>
                     <Button id="envSettingsBtn" variant="success" onClick={handleShow}>
                         Environmental Data Simulator
                     </Button>
                 </Card.Body>
             </Card>
             <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                     <Modal.Title>Environmental Data Simulator</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <Form onSubmit={handleSubmit}>
                         <Form.Group className="mb-2">
                             <Form.Control type="text" id='setpoint' placeholder="Temperature Setpoint"/>
                         </Form.Group>
                         <Form.Group className="mb-2">
                             <Form.Control type="text" id='inTemp' placeholder="Indoor Temperature" />
                         </Form.Group>
                         <Form.Group className="mb-2">
                             <Form.Control type="text" id='outTemp' placeholder="Outdoor Temperature" />
                         </Form.Group>
                         <Form.Group className="mb-2">
                             <Form.Control type="text" id='inHumidity' placeholder="Indoor Humidity" />
                         </Form.Group>
                         <Form.Group className="mb-2">
                             <Form.Control type="text" id='outHumidity' placeholder="Outdoor Humidity" />
                         </Form.Group>
                         <Form.Group className="mb-2">
                             <Form.Control type="text" id='occupancy' placeholder="Occupancy" />
                         </Form.Group>
                         <Form.Group className="mb-2">
                             <FormLabel>CO2 Level</FormLabel>
                             <select style={{ margin : '10px'}} id='co2Levels'>
                                 <option id='low' value="Low">Low</option>
                                 <option id='medium' value="Medium">Medium</option>
                                 <option id='high' value="High">High</option>
                             </select>
                         </Form.Group>
                         <Button id="submitSettings" variant="primary" type="submit">
                             Submit Values
                         </Button>
                     </Form>
                 </Modal.Body>
             </Modal>
         </>
     )
 }