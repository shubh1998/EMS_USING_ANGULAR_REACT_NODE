import axios from 'axios'
import { store } from '../../store-config/mobx'

class ApiClient {
    constructor(axiosInst) {
      this.axios = axiosInst
    }

    makeRequest = (url, method, data = {}) => this.axios({
        url,
        method,
        data,
    })

    getRequest = (url) => this.makeRequest(url, 'GET')

    putRequest = (url, config) => this.makeRequest(url, 'PUT', config)

    patchRequest = (url, config) => this.makeRequest(url, 'PATCH', config)

    postRequest = (url, config) => this.makeRequest(url, 'POST', config)

    deleteRequest = (url, config) => this.makeRequest(url, 'DELETE', config)
}

// Create axios Instance
const axiosInst = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

// Adding axios request interceptor
axiosInst.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      request.headers["authorization"] = "Bearer " + token;
    }
    request.headers['Content-Type'] = 'application/json';
    return request;
  },
  (error) => {
    console.log(error)
    Promise.reject(error);
  }
);

axiosInst.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data && response.data.statusCode) {
      if(response.headers.authtoken){
        localStorage.setItem("authtoken", response.headers.authtoken);
      }
      if(response.data.statusCode === 200 || response.data.statusCode === 201){
        const successMessage = response.data.message
        store.toaster.setSuccess(successMessage); 
      }
      return response.data.data
    }
    return null
  },
  ({ response }) => {
    if (response.data && response.data.statusCode && response.data.message && response.data.statusCode !== 200 && response.data.statusCode !== 201) {
      const errorMessage = response.data.message;
      store.toaster.setError(errorMessage);     
      store.apiLoader.setLoadingOff("page");
      store.apiLoader.setLoadingOff("submit");
      store.apiLoader.setLoadingOff("update");
    }
    return Promise.reject(response)
  },
)

export default new ApiClient(axiosInst)
