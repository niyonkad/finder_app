import axios from 'axios';

const AUTH_URL = 'http://localhost:8000/api/auth/'

/**
 * @interface RegisterInterface
 * @property {string} username
 * @property {string} password
 * @property {string} password_2
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} school
 * @property {string[]} skills_list
 * @property {string} bio
 */


const authAxios = axios.create({
	baseURL: AUTH_URL,
	headers: {
		'Content-type': 'application/json'
	}
})

/**
 * Login a user with the given information
 * @param {Object} user 
 * @returns {Promise<any>}
 */
function login({ username, password }) {
	return authAxios.post('token/', JSON.stringify({
		username,
		password
	}))
}

/**
 * Register a user with the given information
 * @param {RegisterInterface} user The user information to register
 * @returns {Promise<any>} The response from the server
 */
function register(user) {
	return authAxios.post('register/', JSON.stringify(user))
}

const AuthService = {
	login,
	register
};
export default AuthService;
