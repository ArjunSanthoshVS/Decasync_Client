import axios from 'axios';

const URL = import.meta.env.VITE_SERVER_URL;

export const getOrderList = async () => {
    try {
        const response = await axios.get(`${URL}/order/orders`);
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        throw new Error(error.message);
    }
};

export const createOrder = async (data) => {
    try {
        const response = await axios.post(`${URL}/order/create`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error.message);
        throw new Error(error.message);
    }
};
