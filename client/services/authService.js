import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/user";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  // store json web token
  localStorage.setItem('token', jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem('token', jwt);
}

export function logout() {
  // store json web token
  localStorage.removeItem('token');
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem('token');
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
