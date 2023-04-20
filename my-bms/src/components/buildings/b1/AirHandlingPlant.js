/**
 * Air Handling Plant component, which is responsible
 * for displaying the information about the Air Handling Plant.
 * Once the page loads a name list of Air Handling Plant components
 * from the database.
 * 
 * @author XA1NE
 * @noparam
 * 
 */

import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import deviceStore from '../../../stores/deviceStore';

import AHU from "./plant-assets/AHU";
import Chiller from "./plant-assets/Chiller";
import Pump from "./plant-assets/Pump";

import EnvironmentalSettings from "./EnvironmentalSettings";

export default function AirHandlingPlant() {

    // Device names arrays
    const [deviceNames, setDeviceNames] = useState({ 
        "ahus": [],
        "chillers": [],
        "pumps": [],
        "environments": [],
    });

    // Get device names from the database
    useEffect(() => deviceStore.retrieveAllDevices((snapshot) => {
        const data = Object.keys(snapshot.val());
        const devicesInfo = {
            "ahus": data.filter(deviceName => deviceName.includes('AHU')),
            "chillers": data.filter(deviceName => deviceName.includes('Chiller')),
            "pumps": data.filter(deviceName => deviceName.includes('Pump')),
            "environments": data.filter(deviceName => deviceName.includes('Building')),
        };
        setDeviceNames(() => devicesInfo);
    }), []);

    // Return components as a super component
    return (
        <>
            <Container>
                <Row className='mt-4'>
                    {deviceNames.ahus.map((ahuName, index) => 
                        <Col key={index}>
                            <AHU deviceName={ahuName}/>
                        </Col>
                    )}
                    <Col>{ EnvironmentalSettings() }</Col>
                </Row>
                <Row className='mt-4'>
                    {deviceNames.chillers.map((chillerName, index) => 
                        <Col key={index}>
                            <Chiller deviceName={chillerName}/>
                        </Col>
                    )}
                </Row>
                <Row className='mt-4'>
                    {deviceNames.pumps.map((pumpName, index) => 
                        <Col key={index}>
                            <Pump deviceName={pumpName}/>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}