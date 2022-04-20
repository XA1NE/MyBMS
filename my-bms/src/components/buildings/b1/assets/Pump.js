/**
 * Pump Component, which is a part of the Air Handling Plant.
 * It is responsible for displaying the information about the Pump.
 * 
 * @author Kamil Kawka
 * @param {string} deviceName - The name of the device.
 * 
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import deviceStore from '../../../../stores/deviceStore';

export default function Pump(props) {
    
    // Pump state object
    const [pumpState, setPumpState] = useState({});

    // Get Mode title
    const getModeTitle = () => {
        switch (pumpState['Mode']) {
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
        switch(pumpState['Running State']) {
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
        switch(pumpState['Running State']) {
            case 1:
                return "primary";
            case 2:
                return "secondary";
            default:
                return "danger";
        }
    }

    // Set mode in the database
    const setMode = (event) => deviceStore.updateDevice(props.deviceName, '/Mode', parseInt(event.target.value));

    // When the value in pump changes in the database, update the state of the pump
    useEffect(() => deviceStore.onUpdateDevice(props.deviceName, (snapshot) =>  setPumpState(() => snapshot.val())), []);

    // Returns the JSX component of the Pump
    return (
        <>
            <Card id={props.deviceName}>
                <Card.Header>
                    <Card.Title id="pumps-title">{props.deviceName} <Badge pill bg={getRunningStateBadgeColor()}>{getRunningStateTitle()}</Badge></Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Mode:</strong> <span id="mode">{ getModeTitle() }</span> 
                        <Button style={{ marginLeft : '10px' }}size="sm" value={1} onClick={setMode}>ON</Button>
                        <Button style={{ margin : '5px' }} size="sm" value={0} onClick={setMode}>OFF</Button>
                        <Button size="sm" value={2} onClick={setMode}>AUTO</Button>
                    </Card.Text>
                    <Card style={{ padding : '10px'}}>
                        <Card.Text><strong>Pump Speed:</strong> <span id="pumpSpeed">{ pumpState['Pump Speed'] }</span> %</Card.Text>
                    </Card>
                </Card.Body>
            </Card>
        </>
    )
}