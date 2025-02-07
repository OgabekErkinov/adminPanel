import axios from 'axios';
import api from './config';

//post requests
export const loginApi = async (formData) => {
  try {
    const {data} = await api.post("auth/signin", formData);
    if(data?.data?.tokens?.accessToken?.token){
      localStorage.setItem('token', data?.data?.tokens?.accessToken?.token)
    }
    return data;

  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};


export const createCategory = async (formData) => {
  try {
    const response = axios.post("categories", formData)
    return response
    
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
}

export const createBrand = async (formData) => {
  const response = axios.post("https://realauto.limsa.uz/api/brands", formData, {
    headers: { "Content-Type": "multipart/form-data" },})

    return response

}

export const createCity = async (formData) => {
  const response = axios.post("https://realauto.limsa.uz/api/cities", formData, {
    headers: { "Content-Type": "multipart/form-data" },})

    return response

}

export const createLocation = async (formData) => {
  const response = axios.post("https://realauto.limsa.uz/api/locations", formData, {
    headers: { "Content-Type": "multipart/form-data" },})

    return response

}

export const createCars = async (formData) => {
  const response = axios.post("https://realauto.limsa.uz/api/cars", formData, {
    headers: { "Content-Type": "multipart/form-data" },})

    return response

}


//get requests
export const getCategories = async() => {
  try {
    const {data} = await api.get('categories')
    
  } catch (error) {
    throw new Error(error)
    
  }
}


