/**
 * App component, creates routes to the components of the web app.
 * 
 * @author Kamil Kawka
 * 
 */

import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import BuildingOverview from './buildings/b1/BuildingOverview';
import AirHandlingPlant from './buildings/b1/AirHandlingPlant';
import Nav from './Nav';

import { Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import AuthProvider from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';


function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes>

            <Route path="/login" element={<Login />} />

            <Route // Private Route for Dashboard (Protected)
              path="/"
              element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              }
            />

            <Route // Private Route for Building (1) - Landing Page (Protected)
              path="/building1"
              element={
              <PrivateRoute>
                <Card><Nav /></Card>
                <BuildingOverview />
              </PrivateRoute>
              }
            />

            <Route // Private Route for Building (1) - Air Handling Plant (Protected)
              path="/building1/airhandlingplant"
              element={
              <PrivateRoute>
                <Card><Nav /></Card>
                <AirHandlingPlant />
              </PrivateRoute>
              }
            />

          </Routes>
        </AuthProvider>
      </Router>
  )
}

export default App;