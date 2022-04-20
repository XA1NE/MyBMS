/**
 * Dashboard component, allows access to the building data
 * for authenticated users.
 * 
 * @author Kamil Kawka
 * 
 */

import React, { useState } from 'react'
import { Container, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
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
        <>
            <Container className='d-flex align -items-center justify-content-center'
                style={{ minHeight: '100vh', padding: '50px'}}>
                <div className='w-100' style={{ maxWidth: '400px' }}>
                    <Card>
                        <Card.Header>
                            <div id="dashboard" className='text-center'><h3>Dashboard</h3></div>
                        </Card.Header>
                        <Card.Body>
                            { error && <Alert variant="danger">{ error }</Alert> }
                            <Link to='/building1' id='building-1' className='btn btn-primary w-100 mt-3'>
                                Building 1 - BMS
                            </Link>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        <Button
                            variant='link'
                            onClick={handleLogout}
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </Container>
        </>
    )
}
