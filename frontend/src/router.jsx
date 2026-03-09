import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Index from './pages/index.jsx'

function Router() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router
