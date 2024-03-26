import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../url";
const Home = () => {
  const [data, setData] = useState([]);
  const handleCloseItem = () => setCreateAddOnItem(false);
  const [dataItem, setDataItem] = useState({});
  const [addonId, setAddonId] = useState("");
  const [createAddOnItem, setCreateAddOnItem] = useState(false);
  const handleOpenItem = (id) => {
    setCreateAddOnItem(true);
    setAddonId(id);
  };
  const navigate = useNavigate();

  const handleChangeItem = (event) => {
    setDataItem({ ...dataItem, [event.target.name]: event.target.value });
  };

  const applyForJob = async (id) => {
    try {
      console.log("applyForJob", id);
      const res = await axios.get(
        `${baseUrl}/api/v1/candidate/apply-for-job/${id}`
      );
      // setData(res.data.jobs);
      getAllInstructors();
      alert("Applied successfully");

      console.log("All instructor", res);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("localStorage.getItem", localStorage.getItem("candidate"));

  const getJobStatus = async (id) => {
    try {
      const res = await axios.get(
        `${baseUrl}/api/v1/candidate/job-status/${id}`
      );
      console.log(res.data.data);
      setCreateAddOnItem(true);
      setAddonId(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInstructors = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/candidate/all-jobs`);
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

  const textStyles = {
    // display: "flex",
    // justifyContent: "space-around",

    my: 5,
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Container>
      <Typography variant="h5" component="div">
        List of Company
      </Typography>
      <Grid container spacing={2} sx={textStyles}>
        {data.map((item, index) => (
          <Accordion key={item._id} sx={{ border: 1, width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}a-content`}
              id={`panel${index + 1}a-header`}
              sx={{ backgroundColor: "gray" }}
            >
              <Typography sx={{ mx: 2, fontWeight: "bold" }}>
                Name:{item.name}
              </Typography>
              <Typography sx={{ mx: 2 }}>City:{item.city}</Typography>
              <Typography sx={{ mx: 2 }}>Address:{item.address}</Typography>
              {/* <Button
                onClick={() => handleOpenItem(item._id)}
                variant="contained"
              >
                Create Job
              </Button> */}
            </AccordionSummary>
            <AccordionDetails>
              {item.job.map((addOnItem) => (
                <Box key={addOnItem._id}>
                  <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                    jobTitle : {addOnItem.jobTitle} | jobType :{" "}
                    {addOnItem.jobType}
                  </Typography>
                  <Typography>
                    minExperience : {addOnItem.minExperience} | salary :{" "}
                    {addOnItem.salary}
                  </Typography>
                  <Typography>skills : {addOnItem.skills}</Typography>
                  <Typography>
                    appliedCandidates : {addOnItem.appliedCandidates.length}
                  </Typography>
                  <Typography>description : {addOnItem.description}</Typography>
                  {addOnItem.appliedCandidates.includes(
                    localStorage.getItem("candidate")
                  ) ? (
                    <Button
                      variant="contained"
                      // onClick={() => handleOpenItem(addOnItem._id)}
                      onClick={() => getJobStatus(addOnItem._id)}
                    >
                      status
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => applyForJob(addOnItem._id)}
                    >
                      Apply for job
                    </Button>
                  )}

                  <Divider />
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>

      <Modal
        open={createAddOnItem}
        onClose={handleCloseItem}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              Job Status : {addonId.status}
            </Typography>
            <Typography sx={{ fontWeight: "bold", mt: 2 }}>
              {/* {`Job Status : ${addonId.reason ? addonId.reason : ""}`} */}
              {addonId.reason ? ` Reason :${addonId.reason}` : ""}
            </Typography>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
};

export default Home;
