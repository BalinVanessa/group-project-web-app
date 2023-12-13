import axios from "axios";
const client = axios.create({
    withCredentials: true,
});

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const DRINKS_API = `${BASE_API}api/drinks`;

export const createDrink = async (drink) => {
    const response = await client.post(`${DRINKS_API}`, drink);
    return response.data;
};

export const deleteDrink = async (drink) => {
    const response = await client.delete(`${DRINKS_API}/${drink.idDrink}`);
    return response.data;
}

export const findAllDrinks = async () => {
    const response = await client.get(`${DRINKS_API}`);
    return response.data;
}

export const findDrinkById = async (idDrink) => {
    const response = await client.get(`${DRINKS_API}/${idDrink}`);
    return response.data;
}

export const findDrinkByName = async (drinkName) => {
    const response = await client.get(`${DRINKS_API}/name/${drinkName}`);
    return response.data;
}

export const updateDrink = async (drink) => {
    const response = await client.put(`${DRINKS_API}/${drink.idDrink}`, drink);
    return response.data;
}