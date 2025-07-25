// save or update user in db

import axios from "axios";

export const saveUserInDB = async (user) => {
  const { data } = await axios.post("https://sonarbangla-travels.vercel.app/user", user);
  // console.log(data);
};

export const checkIfGuide = async (userEmail) => {
  if (!userEmail) return false;

  try {
    const res = await fetch("https://sonarbangla-travels.vercel.app/api/guide-emails");
    const guideEmails = await res.json();
    return guideEmails.includes(userEmail);
  } catch (error) {
    console.error("Error checking guide status:", error);
    return false;
  }
};
