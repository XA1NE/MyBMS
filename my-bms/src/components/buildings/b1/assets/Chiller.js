/**
 * Chiller Component, which is a part of the Air Handling Plant.
 * It is responsible for displaying the information about the Chiller
 * and its sensors.
 * 
 * @author Kamil Kawka
 * @param {string} deviceName - The name of the device.
 * 
 */

 import React from 'react';
 import { useState, useEffect } from 'react';
 import { Card, Badge, Button } from 'react-bootstrap';
 import deviceStore from '../../../../stores/deviceStore';
 
 export default function Chiller(props) {
 
     // Chiller state object
     const [chillerState, setChillerState] = useState({});
 
     // Get Mode title
     const getModeTitle = () => {
         switch (chillerState['Mode']) {
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
         switch(chillerState['Running State']) {
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
         switch(chillerState['Running State']) {
             case 1:
                 return "primary";
             case 2:
                 return "secondary";
             default:
                 return "danger";
         }
     }
 
     // Set Mode in the database
     const setMode = (event) => deviceStore.updateDevice(props.deviceName, 'Mode', parseInt(event.target.value));
 
     // When the value in chiller changes in the database, update the state chiller
     useEffect(() => deviceStore.onUpdateDevice(props.deviceName, (snapshot) =>  setChillerState(() => snapshot.val())), []);
 
     // Returns the JSX component of the Chiller
     return (
         <>
             <Card id={props.deviceName}>
                 <Card.Header>
                     <Card.Title id="chillers-title">{props.deviceName} <Badge pill bg={getRunningStateBadgeColor()}>{getRunningStateTitle()}</Badge></Card.Title>
                 </Card.Header>
                 <Card.Body>
                     <Card.Text>
                         <strong>Mode:</strong> <span id="mode">{ getModeTitle() }</span>
                         <Button style={{ marginLeft : '10px' }}size="sm" value={1} onClick={setMode}>ON</Button>
                         <Button style={{ margin : '5px' }} size="sm" value={0} onClick={setMode}>OFF</Button>
                         <Button size="sm" value={2} onClick={setMode}>AUTO</Button>
                     </Card.Text>
                     <Card style={{ padding : '10px'}}>
                         <Card.Text><strong>Supply Temperature:</strong> <span id="flowTemp">{ chillerState['Flow Temperature'] }</span> °C</Card.Text>
                         <Card.Text><strong>Return Temperature:</strong> <span id="returnTemp">{ chillerState['Return Temperature'] }</span> °C</Card.Text>
                     </Card>
                 </Card.Body>
             </Card>
         </>
     )
 }