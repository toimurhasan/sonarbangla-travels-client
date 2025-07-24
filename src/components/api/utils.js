// save or update user in db

import axios from "axios";

export const saveUserInDB = async (user) => {
  const { data } = await axios.post("https://sonarbangla-travels.vercel.app/user", user);
  console.log(data);
};
