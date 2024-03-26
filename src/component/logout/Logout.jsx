import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "../resusableComponents/AdminContext";
import { baseUrl } from "../url";
const Logout = (props) => {
  const { setIsAuthenticated } = useContext(AdminDataContext);
  const navigate = useNavigate();
  const logout = async () => {
    await axios.post(`${baseUrl}/api/v1/candidate/logout`);

    setIsAuthenticated(false);
    // localStorage.removeItem("loginType");
    localStorage.clear();
    return navigate("/login");
  };
  useEffect(() => {
    logout();
  }, []);
};

export default Logout;
