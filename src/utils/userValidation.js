import axios from "axios";

async function userValidation(name, password) {
  try {
    const apiUrl = await axios.post("https://dummyjson.com/auth/login", {
      username: name,
      password: password,
      expiresInMins: 30,
    });
    const result = apiUrl.data;
    return result;
  } catch (error) {
    console.log("Error", error);
  }
}

export default userValidation;
