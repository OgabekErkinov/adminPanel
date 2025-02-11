import axios from 'axios';
import api from './config';

//login requests
export const loginApi = async (formData) => {
  try {
    const {data} = await api.post("/auth/signin", formData);
    if(data?.data?.tokens?.accessToken?.token){
      localStorage.setItem('token', data?.data?.tokens?.accessToken?.token)
    }
    return data;

  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

//category requests
export const createCategory = async (formData) => {
  try {
    const response = await api.post("/categories", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
};

export const getCategories = async() => {
  try {
    const {data} = await api.get('/categories')
    return data  
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);  
  }
}

export const deleteCategory = async (id) => {
  try {
    const {data} = await api.delete(`/categories/${id}`)
    return data
    
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
}

export const updateCategory = async (formData, id) => {
  try {
    const response = await api.put(`/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
};

// ................................................................
//brand requests..
export const createBrand = async (formData) => {
  const response = api.post("/brands", formData, {
    headers: { "Content-Type": "multipart/form-data" },})
    return response
}

export const getBrands = async () => {
  try {
    const {data} = await api.get('/brands')
    return data  
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);  
  }

}

export const deleteBrand = async (id) => {
  try {
    const {data} = await api.delete(`/brands/${id}`)
    return data
    
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
}

export const updateBrand = async (formData, id) => {
  try {
    const response = await api.put(`/brands/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
};

//....................................................................

//cities requests
export const createCity = async (formData) => {
  const response = api.post("/cities", formData, {
    headers: { "Content-Type": "multipart/form-data" },})

    return response

}

export const getCities = async() => {
  try {
    const {data} = await api.get('/cities')
    return data  
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);  
  }
}

export const deleteCity = async (id) => {
  try {
    const {data} = await api.delete(`/cities/${id}`)
    return data
    
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
}

export const updateCity = async (formData, id) => {
  try {
    const response = await api.put(`/cities/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
};

//......................................................................

//location requests

export const createLocation = async (formData) => {
  const {data} = api.post("/locations", formData, {
    headers: { "Content-Type": "multipart/form-data" },})

    return data

}

export const getLocations = async() => {
  try {
    const {data} = await api.get('/locations')
    return data  
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);  
  }
}

export const deleteLocation = async (id) => {
   await api.delete(`/locations/${id}`)
}

export const updateLocation = async (id, formData) => {
  try {
    const {data} = await api.put(`/locations/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    return Promise.reject(error.data || error.message);
  }
}


//........................................................................


//.....cars requests
export const createCars = async (formData) => {
  try {
    const response = await api.post("/cars", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
};

export const getCars = async() => {
  try {
    const {data} = await api.get('/cars')
    return data  
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);  
  }
}

export const deleteCar = async (id) => {
  try {
    const {data} = await api.delete(`/cars/${id}`)
    return data
    
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
}

export const updateCar = async (formData, id) => {
  try {
    const response = await api.put(`/cars/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
};


//get requests



