import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;

export const createSupplier = async (data) => {
    try {
        const response = await axios.post(`${URL}/supplier/create`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        throw new Error(error.message);
    }
};
