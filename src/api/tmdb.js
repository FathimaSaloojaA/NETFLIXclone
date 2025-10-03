import axios from "axios";

const API_KEY = "7caa63e17ea72cb80a63ba5095148efd";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (category) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
    return data.results;
  } catch (err) {
    console.log(err);
    return [];
  }
};
