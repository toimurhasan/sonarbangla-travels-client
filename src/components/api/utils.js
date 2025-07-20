// save or update user in db

import axios from "axios";

export const saveUserInDB = async (user) => {
  const { data } = await axios.post("http://localhost:3000/user", user)
  console.log(data)
  ;
};
