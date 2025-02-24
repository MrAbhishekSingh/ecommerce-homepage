import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

