const BASE_URL = "http://localhost:8080/api/employee"
const AUTH_URL = "http://localhost:8080/api/authUsers"

export const getEmployee = async (params = {}) =>{
    const query = new URLSearchParams(params).toString();
  
    const res = await fetch(`${BASE_URL}/getdata/getEmployee?${query}`)
    return res.json()
}

export const getRegisteredUsers = async () => {
    const res = await fetch(`${AUTH_URL}/getusers`)
    return res.json()
}