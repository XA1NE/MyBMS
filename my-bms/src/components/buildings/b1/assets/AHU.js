/**
 * AHU Component, which is a part of the Air Handling Plant.
 * It is responsible for displaying the information about the AHU
 * and its sensors.
 * 
 * @author Kamil Kawka
 * @param {string} deviceName - The name of the device.
 * 
 */

 import React from 'react';
 import { useState, useEffect } from 'react';
 import { Card, Badge, Button, Form } from 'react-bootstrap';
 import deviceStore from '../../../../stores/deviceStore';
 
 export default function AHU(props) {
 
     // AHU state object
     const [ahuState, setAhuState] = useState({});
 
     // Get Mode title
     const getModeTitle = () => {
         switch (ahuState['Mode']) {
             case 1:
                 return "ON";
             case 2:
                 return "AUTO";
             default:
                 return "OFF";
         }
     }
 
     // Get Running State title
     const getRunningStateTitle = () => {
         switch(ahuState['Running State']) {
             case 1:
                 return "Running";
             case 2:
                 return "Standby";
             default:
                 return "OFF";
         }
     }
 
     // Get Running State badge color
     const getRunningStateBadgeColor = () => {
         switch(ahuState['Running State']) {
             case 1:
                 return "primary";
             case 2:
                 return "secondary";
             default:
                 return "danger";
         }
     }
 
     // Assign power state value to an ON/OFF string
     const mapPowerState = (powerState) => powerState ? "ON" : "OFF";
 
     // Assign mode value to an OPEN/CLOSED string
     const mapState = (state) => state ? "OPEN" : "CLOSED";
 
     // Set mode in the database
     const setMode = (event) => deviceStore.updateDevice(props.deviceName, 'Mode', parseInt(event.target.value));
 
     const toggleSwitch = (key, event) => deviceStore.updateDevice(props.deviceName, key, !ahuState[key]);
 
     // When the value in AHU changes in the database, update the state of the AHU
     useEffect(() => deviceStore.onUpdateDevice(props.deviceName, (snapshot) =>  setAhuState(() => snapshot.val())), []);
 
     // Returns the JSX component of the AHU
     return (
         <>
             <Card id={props.deviceName}>
                 <Card.Header>
                     <Card.Title id="ahus-title"> {props.deviceName} <Badge pill bg={getRunningStateBadgeColor()}>{getRunningStateTitle()}</Badge></Card.Title>
                 </Card.Header>
                 <Card.Body>
                     <Card.Text>
                         <strong>Mode:</strong> <span id="mode">{ getModeTitle() }</span>
                         <Button style={{ marginLeft : '10px' }}size="sm" value={1} onClick={setMode}>ON</Button>
                         <Button style={{ margin : '5px' }} size="sm" value={0} onClick={setMode}>OFF</Button>
                         <Button size="sm" value={2} onClick={setMode}>AUTO</Button>
                     </Card.Text>
                     <Card style={{ padding : '10px'}}>
                         <h5><Card.Text>▼ Supply ▼</Card.Text></h5>
                         <Card.Text>
                            <strong>Coolant Bypass Actuator:</strong> <span id="coolantBypass">{ mapState(ahuState['Coolant Bypass Actuator State'])}</span>
                            <Form.Check type="switch" id="bypass-actuator-switch" label="Bypass Override" checked={ahuState['Coolant Bypass Actuator State']} onChange={(e) => toggleSwitch("Coolant Bypass Actuator State", e)}/>
                         </Card.Text>
                         <Card.Text>
                             <strong>Thermal Wheel State:</strong> <span id="thermalWheelState">{ mapPowerState(ahuState['Thermal Wheel State']) }</span>
                             <Form.Check type="switch" id="custom-switch" label="Thermal Wheel Override" checked={ahuState['Thermal Wheel State']} onChange={(e) => toggleSwitch("Thermal Wheel State", e)}/>
                         </Card.Text>
                         <Card.Text>
                             <strong>Humidifier State:</strong> <span id="humidifierState">{ mapPowerState(ahuState['Humidifier State']) }</span>
                             <Form.Check type="switch" id="custom-switch" label="Humidifier Override" checked={ahuState['Humidifier State']} onChange={(e) => toggleSwitch("Humidifier State", e)}/>
                         </Card.Text>
                         <Card.Text>
                             <strong>Supply Fan Speed:</strong> <span id="supplyFanSpeed">{ ahuState['Supply Fan Speed'] }</span> %
                         </Card.Text>
                     </Card>
                     <Card className='mt-4' style={{ padding : '10px'}}>
                         <Card.Text><h5>▼ Extract ▼</h5></Card.Text>
                         <Card.Text><strong>Extract Fan Speed:</strong> <span id="extractFanSpeed">{ ahuState['Extract Fan Speed'] }</span> %</Card.Text>
                         <Card.Text>
                             <strong>Damper State:</strong> <span id="damperState">{ mapState(ahuState['Damper State']) }</span>
                             <Form.Check type="switch" id="custom-switch" label="Damper Override" checked={ahuState['Damper State']} onChange={(e) => toggleSwitch("Damper State", e)}/> 
                         </Card.Text>
                     </Card>
                 </Card.Body>
             </Card>
         </>
     )
 }