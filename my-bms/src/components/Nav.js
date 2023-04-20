/**
 * Main navigation bar of the web application.
 * Function handleLogout() handles logout by destroying the session
 * and redirects to the login page.
 * 
 * @author XA1NE
 * 
 */

import React from 'react';
import { useState } from 'react';
import { Navbar, Container, Offcanvas, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Nav() {
    const [ error, setError ] = useState('')
    const { logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            setError('')
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to sign out')
        }
    }

    return (
        <Navbar style={{ color: "blue"}} bg="light" expand={false}>
            <Container fluid>
                { error && <Alert variant="danger">{ error }</Alert> }
                <Navbar.Brand href="/" style={{color: "black"}}>MyBMS</Navbar.Brand>
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle id="navbarToggle" aria-controls="offcanvasNavbar"  />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Building Services</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='w-100 text-center mt-2'>
                            <Link id="buildingOverview-btn" to='/building1'className='btn btn-secondary w-100 mt-3'>
                                Building Overview
                            </Link>
                            <Link id="airHandlingPlant-btn" to='/building1/airhandlingplant'className='btn btn-secondary w-100 mt-3'>
                                Air Handling Plant
                            </Link>
                            <Button
                                style={{ padding:'50px' }}
                                variant='link'
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}