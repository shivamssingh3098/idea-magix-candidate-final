// import { Grid } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import "./App.css";

import Appbar from "./component/appBar/Appbar";
import Home from "./component/home/Home";
import Login from "./component/login/Login";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "./component/resusableComponents/AdminContext";
import { useContext, useEffect, useState } from "react";
import Logout from "./component/logout/Logout";
import AddCourse from "./component/addCourses/AddCourse";
import AssignCourse from "./component/assignCourse/AssignCourse";
import Lectures from "./component/lectures/Lectures";
import Course from "./component/lectures/Course";
import InstrructorCourse from "./component/instructor/InstrructorCourse";
import InstructorLogout from "./component/instructor/InstructorLogout";
import CreateCompany from "./component/createCompany/CreateCompany";
import JobRequest from "./component/jobRequest/JobRequest";
import CandidateProfile from "./component/home/CandidateProfile";
import Registration from "./component/home/Registration";
import { baseUrl } from "./component/url";

function App() {
  const { isAuthenticated, setIsAuthenticated, loginType } =
    useContext(AdminDataContext);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const currentUser = async (req, res) => {
    try {
      const user = await axios.get(`${baseUrl}/api/v1/candidate`);

      setIsAuthenticated(true);
      console.log("isLoggedIn", isLoggedIn);
      console.log("user", user);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      return navigate("/login");
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <>
      <Appbar />
      {isAuthenticated ? (
        <>
          {" "}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />} />

            {/* <Route path="/addcourses" element={<AddCourse />} /> */}
            <Route path="/candidateprofile" element={<CandidateProfile />} />

            {/* <Route path="/jobjequest/:id" element={<JobRequest />} /> */}

            {/* <Route path="/course" element={<Course />} /> */}
            {/* <Route path="/course" element={<Lectures />} /> */}

            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Registration />}></Route>

          {/* <Route path="/" element={<Home />}></Route> */}
        </Routes>
      )}
    </>
  );
}

export default App;
