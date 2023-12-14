import axios from "axios";
const client = axios.create({
    withCredentials: true,
});

const externalClient = axios.create({
    withCredentials: false
});

const EXTERNAL_BASE_API = process.env.REACT_APP_EXTERNAL_API_BASE_URL || "https://www.thecocktaildb.com/api/json/v1/1/";
const BASE_API = process.env.REACT_APP_BASE_API_URL;
const EXTERNAL_LIST_INGREDIENTS_API = `${EXTERNAL_BASE_API}list.php?i=list`;
const INGREDIENTS_API = `${BASE_API}api/ingredients`;

export const findAllExternalIngredients = async () => {
    const response = await externalClient.get(`${EXTERNAL_LIST_INGREDIENTS_API}`);

    // maps strIngredient1 field to strIngredient to match our schema
    return response.data.drinks.map((ingredient) => (ingredient.strIngredient1));
}

export const findTop5ExternalIngredients = async (partialIngredientName) => {
    const allIngredients = await findAllExternalIngredients();

    const matchingIngredients = allIngredients.filter((ingredient) => {
        // filter ingredients for ones that start with partial name using regex
        const regex = new RegExp(`^${partialIngredientName}`, 'i');
        return regex.test(ingredient);
    });

    const top5Ingredients = matchingIngredients.slice(0, 5) // only return first 5 elements\
    return top5Ingredients;
}

export const findExternalIngredientById = async (ingredientId) => {
    const response = await externalClient.get(`${EXTERNAL_BASE_API}lookup.php?iid=${ingredientId}`);

    const ingredient = response.data.ingredients[0];
    return ingredient;
}

export const findExternalIngredientByName = async (ingredient) => {
    const response = await externalClient.get(`${EXTERNAL_BASE_API}search.php?i=${ingredient}`);

    const ingredientResponse = response.data.ingredients && response.data.ingredients[0];
    return ingredientResponse;
}

export const findAllMixrIngredients = async () => {
    const response = await client.get(`${INGREDIENTS_API}`);
    return response.data;
}

export const findMixrIngredientById = async (ingredientId) => {
    const response = await client.get(`${INGREDIENTS_API}/id`, {
        params: {
            id: ingredientId,
        },
    });
    return response.data;
}

export const findMixrIngredientByName = async (ingredientName) => {
    const response = await client.get(`${INGREDIENTS_API}/name`, {
        params: {
            name: ingredientName,
        },
    });
    return response.data;
}

export const findTop5MixrIngredients = async (partialIngredientName) => {
    const response = await client.get(`${INGREDIENTS_API}/${partialIngredientName}`);
    return response.data.map((ingredient) => ingredient.strIngredient);
}

export const createMixrIngredient = async (ingredient) => {
    const response = await client.post(`${INGREDIENTS_API}`, ingredient);
    return response.data;
}