import { Routes, Route } from 'react-router-dom'
import TestPage from './pages/TestPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}
