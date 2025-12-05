import axios from 'axios';

const AUTH_URL = 'http://localhost:9090/auth';

export async function login(username, password) {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, { 
      username, 
      password 
    });
    
    const { token, username: user, role } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('username', user);
    localStorage.setItem('role', role); 
    
    return { token, username: user, role };
  } catch (error) {
    console.error('Login falló:', error.response?.data || error.message);
    throw error;
  }
}

export async function register(username, password, role = 'ADMIN') {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, { 
      username, 
      password,
      role 
    });
    return response.data;
  } catch (error) {
    console.error('Registro falló:', error.response?.data || error.message);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role'); 
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function getUsername() {
  return localStorage.getItem('username');
}

export function getRole() {
  return localStorage.getItem('role'); 
}

export function isAdmin() {
  return localStorage.getItem('role') === 'ADMIN'; 
}
