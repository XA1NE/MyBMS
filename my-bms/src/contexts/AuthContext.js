/**
 * Backend authentication context.
 * 
 * @author Kamil Kawka
 * 
 */

import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../services/firebaseconfig'


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {

    // User state
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // Login effect
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password) // Firebase function
    }

    // Logout effect
    function logout() {
        return auth.signOut() // Firebase function
    }

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value = { value }>
            { !loading && children }
        </AuthContext.Provider>
    )
}
