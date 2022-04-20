/**
 * Building overview component for Building 1.
 * Displays environmental data and connection status
 * of the intelligent devices.
 * 
 * @author Kamil Kawka
 * @noparam
 * 
 */

import React from 'react';
import { Container, Col, Row, } from "react-bootstrap";

import EnvironmentalSettings from './EnvironmentalSettings';
import HeartbeatChecker from './HeartbeatChecker';

export default function BuildingOverview() {

    // Return components as a super component
    return (
        <>     
            <Container>
                <Row className='mt-4'>
                    <Col><HeartbeatChecker /></Col>
                    <Col><EnvironmentalSettings /></Col>
                </Row>
            </Container>
        </>
    );
}
