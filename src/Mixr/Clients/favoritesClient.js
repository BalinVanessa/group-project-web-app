import axios from "axios";
const client = axios.create({
    withCredentials: true,
});

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const FAVS_API = `${BASE_API}api`

export const findAllFavs = async () => {
    const response = await client.get(`${FAVS_API}/favorites`);
    return response.data;
}

export const createUserFavDrink = async (userId, drinkId) => {
    const response = await client.post(`${FAVS_API}/users/${userId}/favorites/${drinkId}`);
    return response.data;
}

export const deleteUserFavDrink = async (userId, drinkId) => {
    const response = await client.delete(`${FAVS_API}/users/${userId}/favorites/${drinkId}`);
    return response.data;
}

export const findUsersThatFavDrink = async (drinkId) => {
    const response = await client.get(`${FAVS_API}/favorites/${drinkId}/users`);
    return response.data;
}

export const findDrinksThatUserFav = async (userId) => {
    const response = await client.get(`${FAVS_API}/users/${userId}/favorites`);
    return response.data;
}
