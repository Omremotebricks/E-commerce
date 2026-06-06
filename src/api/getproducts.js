import axios from "axios";

async function getproducts(query = "") {
  try {
    const response = await axios.get(`https://dummyjson.com/products${query}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(
        error.response.data?.message ||
          `Server Error (${error.response.status})`,
      );
    }

    if (error.request) {
      // Request made but no response
      throw new Error("Network Error. Please check your internet connection.");
    }

    // Something else happened
    throw new Error(error.message || "Something went wrong.");
  }
}

export { getproducts };
