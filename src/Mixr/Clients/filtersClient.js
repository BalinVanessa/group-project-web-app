import axios from "axios";
const request = axios.create({
    withCredentials: true,
});

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const FILTERS_API = `${BASE_API}/api/filters`;

export const getCurrentFilters = async () => {
    const response = await request.get(`${FILTERS_API}`);
    return response.data;
}

export const addIngredientFilter = async (ingredient) => {
    const response = await request.post(`${FILTERS_API}/ingredients`, ingredient);
    return response.data;
}

export const removeIngredientFilter = async (ingredient) => {
    const response = await request.delete(`${FILTERS_API}/ingredients/${ingredient}`);
    return response.data;
}

export const setAlcoholicFilter = async (isAlcoholic) => {
    const response = await request.put(`${FILTERS_API}/isAlcoholic`, isAlcoholic);
    return response.data;
}

export const setFilters = async (filters) => {
    const response = await request.put(`${FILTERS_API}`, filters);
    return response.data;
}
