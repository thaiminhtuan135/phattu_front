

const payload = (token) => {
  const payload = token.split(".")[1];
  return decode(payload);
}

function isValidToken(token) {
  return !payload(token) ? false : true;

}

function decode(payload) {
  return JSON.parse(atob(payload));
}


export function Token() {
  return {isValidToken, payload, decode}
}

