import axios from "axios";

const externalClient = axios.create({
    withCredentials: false
});

const EXTERNAL_BASE_API = process.env.REACT_APP_EXTERNAL_API_BASE_URL || "https://www.thecocktaildb.com/api/json/v1/1/";
const EXTERNAL_SEARCH_DRINKS_URL = `${EXTERNAL_BASE_API}search.php?s=`;

export const findExternalDrinksByName = async(cocktailName) => {
    const response = await externalClient.get(`${EXTERNAL_SEARCH_DRINKS_URL}${cocktailName}`);

    return response.data.drinks;
}

export const findExternalDrinksByID = async (drinkId) => {
    const response = await externalClient.get(`${EXTERNAL_BASE_API}lookup.php?i=${drinkId}`);

    return response.data.drinks[0];
}