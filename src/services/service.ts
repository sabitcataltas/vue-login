// axios-service.ts
import { useAuthStore } from '@/store/store';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';


const API_URL = process.env.API_URL ? process.env.API_URL : "http://localhost:8080";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});


// Define an Axios service class
class Service {

  private instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
  }

  authHeader(): object {
    //const authStore = useAuthStore();
    let token = localStorage.getItem('token');//authStore.getToken();
    console.log(token);
    if (token) {
      return { headers: { Authorization: 'Bearer ' + token } };
    } else {
      return {};
    }
  }

  // Define a method for making a POST request
  async postLogin<T>(url: string, data?: object, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async get<T>(url: string, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, { ...this.authHeader(), ...config });
  }

  // Define a method for making a POST request
  async post<T>(url: string, data?: object, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, { ...this.authHeader(), ...config });
  }

  async put<T>(url: string, data?: object, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, { ...this.authHeader(), ...config });
  }

  async delete<T>(url: string, config?: object): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, { ...this.authHeader(), ...config });
  }

}

// Create an instance of the AxiosService
const service = new Service(axiosInstance);

export default service;

