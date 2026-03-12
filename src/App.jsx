import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ToastProvider } from './components/ui/Toast'
import { ProtectedRoute, PublicOnlyRoute } from './routes/Guards'
import AppLayout from './components/layout/AppLayout'

import LoginPage    from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import BooksPage    from './pages/books/BooksPage'
import ReadingPage  from './pages/reading/ReadingPage'
import StreaksPage  from './pages/streaks/StreaksPage'
import FriendsPage  from './pages/social/FriendsPage'
import ProfilePage  from './pages/profile/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public only */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/books"     element={<BooksPage />} />
                <Route path="/readings"  element={<ReadingPage />} />
                <Route path="/streaks"   element={<StreaksPage />} />
                <Route path="/friends"   element={<FriendsPage />} />
                <Route path="/profile"   element={<ProfilePage />} />
              </Route>
            </Route>

            {/* Default */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
