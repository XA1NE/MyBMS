/**
 * HeartbeatChecker background component, takes a snapshot
 * of the database and checks if the device is still alive.
 * 
 * @author Kamil Kawka
 * @noparam
 * 
 */

 import React from 'react';
 import { useEffect, useState } from 'react';
 import { Card } from 'react-bootstrap';
 import deviceStore from '../../../stores/deviceStore';
 
 import DeviceHealth from "./assets/DeviceHealth";
 
 export default function HeartbeatChecker() {
 
     // Devices state object
     const [devices, setDevices] = useState([]);
 
     // Get devices heartbeat values as a snapshot when they change in the database
     useEffect(() => deviceStore.onUpdateDevice("Heartbeats", (snapshot) => setDevices(Object.keys(snapshot.val()))), []);
 
     return (
         <>
             <Card>
                 <Card.Header>
                 <Card.Title>Connection Status</Card.Title>
                 </Card.Header>
                 <Card.Body>
                     {devices.map((device) => 
                         <Card.Text>
                             <DeviceHealth deviceName={device}/>
                         </Card.Text>
                     )}
 
                 </Card.Body>  
             </Card>
         </>
     )
 }