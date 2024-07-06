import axios from 'axios';
const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json", //this line solved cors
    },
});

const apiURL = import.meta.env.VITE_API_URL;
console.log("apiturl", apiURL);
export const baseURL = "http://localhost:8000";
export default api;
