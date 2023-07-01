const storeToken = (token) => {
  localStorage.setItem("token", token)
  setTimeout(function (){
    localStorage.removeItem('token')
  },1000 * 60 * 60)
};

const storeUser = (user) => localStorage.setItem("user", user);

const store = (token, user) => {
  storeToken(token);
  storeUser(user);
}

const clear = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
const getToken = () => {
  return localStorage.getItem("token");
}
const getUser = () => {
  localStorage.getItem("user");
}

export function AppStorage(){
  return {storeToken, storeUser, store, clear, getToken, getUser}
}
