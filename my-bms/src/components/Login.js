/**
 * Login component of the web app, responsible for displaying the login form.
 * and handling the login process.
 * 
 * @noparam
 * @author Kamil Kawka
 * 
 */

import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    let emailRef = useRef()
    let passRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
            navigate('/')
        } catch {
            setError('Something went wrong while logging in')
        }
        setLoading(false)
    }

    return (
        <>
            <Container className='d-flex align -items-center justify-content-center'
                style={{ minHeight: '100vh', padding: '50px'}}>
                <div className='w-100' style={{ maxWidth: '400px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login to MyBMS</h2>
                            {error && <Alert id="loginerror" variant="danger">{error}</Alert>}
                            <Form onSubmit = { handleSubmit } >
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control id="email-field" type="email" ref = {emailRef} required/>                      
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id="password-field" type="password" ref = {passRef} required/>
                                </Form.Group>
                                <Button id="login-button" disabled = { loading } className="w-100 mt-3" type="submit">
                                    Log In
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}