import base from "./baseURL";

export const LOCALSTORAGE_KEY = "token";
export const USERNAME = "username";

export async function signin(username, password) {
  const response = await base.post("/api/login/", {
    username,
    password,
  });


  localStorage.setItem(LOCALSTORAGE_KEY, response.data.token);
  localStorage.setItem(USERNAME, response.data.user_id);

  return response.data;
}

export async function signup(username, password, metamask_wallet_address) {
  const response = await base.post("/api/register/", {
    username,
    password,
    userprofile:{
      metamask_wallet_address  
    }
    
  });

  return response.data;
}
export function logout() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
  localStorage.removeItem(USERNAME);
}