import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

/**
 * A component that renders the protected route based on the user's authentication status.
 * If the user is authenticated, it renders the child components wrapped in an Outlet component.
 * If the user is not authenticated, it redirects to the login page with the current location state.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.allowedRoles - The roles allowed to access the protected route.
 * @returns {JSX.Element} - The protected route component.
 */
function ProtectedRoute({ allowedRoles }) {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.accessToken ? 
  		<Outlet /> : <Navigate to="/login" state={{ from: location}} replace />
}

export default ProtectedRoute