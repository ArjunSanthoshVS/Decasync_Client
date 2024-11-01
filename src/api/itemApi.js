import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;

export const getSupplier = async () => {
    try {
        const response = await axios.get(`${URL}/item/suppliers`);
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        throw new Error(error.message);
    }
};

export const getItems = async () => {
    try {
        const response = await axios.get(`${URL}/item/items`);
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        throw new Error(error.message);
    }
};

export const uploadItemImage = async (data) => {
    try {
        const response = await axios.post(`${URL}/item/uploadImage`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        throw new Error(error.message);
    }
};

export const createItem = async (data) => {
    try {
        const response = await axios.post(`${URL}/item/create`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        throw new Error(error.message);
    }
}