/**
 * DeviceHealth Component, responsible for displaying data
 * about the device's connection status.
 * 
 * @author Kamil Kawka
 * @param {string} deviceName - The name of the device.
 * 
 */

 import React from 'react';
 import { useEffect, useState } from 'react';
 import { Badge } from 'react-bootstrap';
 import deviceStore from '../../../../stores/deviceStore';
 
 export default function DeviceHealth(props) {
 
     // Device state object
     const [healthBadgeColor, setHealthBadgeColor] = useState("danger");
     const [healthBadgeText, setHealthBadgeText] = useState("DISCONNECTED");
     const [heartbeatTimestamp, setHeartbeatTimestamp] = useState(null);
     const [timer, setTimer] = useState();
 
     // Get device heartbeat (timestamp) when the timestamp value changes in the database
     useEffect(() => deviceStore.onUpdateDevice(`Heartbeats/${props.deviceName}`, (snapshot) => {
         setHealthBadgeColor("success");
         setHealthBadgeText("HEALTHY");
         setHeartbeatTimestamp(snapshot.val());         
     }), []);
 
     // Timer for the heartbeat, when the device is not responding
     // the health badge will change to danger and text to DISCONNECTED
     useEffect(() => {
         clearTimeout(timer);
         const timeout = setTimeout(() => {
             setHealthBadgeColor("danger");
             setHealthBadgeText("DISCONNECTED");
         }, 10000);
         setTimer(() => timeout);
     }, [heartbeatTimestamp]);
 
     // Returns the badge
     return (
         <>
             <strong>{props.deviceName}</strong> <Badge id={props.deviceName} pill bg={healthBadgeColor}>{healthBadgeText}</Badge>
         </>
     )
 }