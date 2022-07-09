import axios from "axios";

const API_SERVER = "https://calmmoney.herokuapp.com/";

export const backend =  axios.create({
    baseURL: API_SERVER,
    withCredentials: true,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        }
  })

  