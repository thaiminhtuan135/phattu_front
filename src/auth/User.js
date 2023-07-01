import {Token} from "@/auth/Token";
import {AppStorage} from "./AppStorage"

const {store, getToken} = AppStorage();
const {payload} = Token();

const responseAfterLogin = (token, username) => {
  if (token) {
    store(token, username);
  }
}
const hasToken = () => {
  const token = localStorage.getItem("token");
  return !!token;
}
const logIn = () => {
  hasToken();
}
const username = () => {

}

const getUserId = () => {
  const token = getToken();
  const userInfo = payload(token);
  return userInfo.id;
}

const getUser= () => {
  const token = getToken();
  const userInfo = payload(token);
  return userInfo;
}

export function User() {
  return {responseAfterLogin, logIn, username, hasToken, getUserId , getUser}
}

