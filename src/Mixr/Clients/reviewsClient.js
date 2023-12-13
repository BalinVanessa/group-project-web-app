import axios from "axios";
const client = axios.create({
    withCredentials: true,
});

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const REVIEWS_API = `${BASE_API}api/reviews`;

export const createReview = async (review) => {
    const response = await client.post(`${REVIEWS_API}`, review);
    return response.data;
};

export const deleteReview = async (review) => {
    const response = await client.delete(`${REVIEWS_API}/${review._id}`);
    return response.data;
}

export const editReview = async (review) => {
    const response = await client.put(`${REVIEWS_API}/${review._id}`, review);
    return response.data;
}

export const findAllReviews = async () => {
    const response = await client.get(`${REVIEWS_API}`);
    return response.data;
}

export const findReviewById = async (reviewId) => {
    const response = await client.get(`${REVIEWS_API}/${reviewId}`);
    return response.data;
}

export const findReviewsForDrink = async (drink) => {
    const response = await client.get(`${REVIEWS_API}/drinks/${drink.idDrink}`);
    return response.data;
}

export const findReviewsFromUser = async (user) => {
    const response = await client.get(`${REVIEWS_API}/users/${user._id}`);
    return response.data;
}