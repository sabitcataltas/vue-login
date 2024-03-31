// axios-service.ts
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8080'; ///api/token
// Create an Axios instance with custom configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  
});

// Define an Axios service class
class LoginService {
    
  private instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
  }

  // Define a method for making a GET request
  async get<T>(url: string, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  // Define a method for making a POST request
  async post<T>(url: string, data?: object, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: object, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async delete<T>(url: string, data?: object): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, data);
  }

}

// Create an instance of the AxiosService
const loginService = new LoginService(axiosInstance);

export default loginService;

