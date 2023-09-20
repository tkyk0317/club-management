/** @jsxImportSource @emotion/react */
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from '@app/components/Login'
import Todo from '@app/components/Todo'
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