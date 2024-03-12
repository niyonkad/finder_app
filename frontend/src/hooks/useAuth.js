import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
// import { Navigate, Route } from 'react-router-dom'

const useAuth = () => {
	return useContext(AuthContext)
}

export default useAuth