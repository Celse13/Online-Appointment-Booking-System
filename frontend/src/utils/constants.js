import { jwtDecode } from 'jwt-decode';

export const token = localStorage.getItem('token');
export const decoded = jwtDecode(token);
export const role = decoded.role;
