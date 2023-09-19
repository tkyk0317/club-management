/** @jsxImportSource @emotion/react */
import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Todo from './components/Todo'
import NotFound from './components/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}