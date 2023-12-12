import axios from "axios";
const request = axios.create({
    withCredentials: true,
});

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const FILTERS_API = `${BASE_API}api/filters`;

export const getCurrentFilters = async () => {
    const response = await request.get(`${FILTERS_API}`);
    return response.data;
}

export const setFilters = async (filters) => {
    const response = await request.put(`${FILTERS_API}`, filters);
    return response.status;
}
