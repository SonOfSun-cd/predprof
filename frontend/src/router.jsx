import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Router
