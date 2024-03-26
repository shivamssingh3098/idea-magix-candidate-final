import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../url";

const CandidateProfile = () => {
  const [data, setData] = useState({});
  const getAllInstructors = async () => {
    const res = await axios.get(
      `${baseUrl}/api/v1/candidate/candidate-profile`
    );
    setData(res.data.jobs);

    console.log("All instructor", res);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);
  return (
    <div>
      {" "}
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Candidate Information
          </Typography>
          <Box>
            <Typography variant="subtitle1">
              <strong>Full Name:</strong> {data.fullName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Email:</strong> {data.email}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Mobile:</strong> {data.mobile}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Gender:</strong> {data.gender}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Total Applied Jobs:</strong>{" "}
              {data.appliedJobsStatus?.length}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default CandidateProfile;
