// RedirectToHome.jsx
import { useEffect } from "react";

const RedirectToHome = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return null;
};

export default RedirectToHome;
