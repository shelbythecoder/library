import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const BorrowerModal = () => {
  const [open, setOpen] = useState(false);
  const [borrowerInfo, updateBorrowerInfo] = useState({
    firsName: "",
    lastName: "",
    relationship: "",
    city: "",
  });

  const setBorrowerInfo = (key, value) => {
    updateBorrowerInfo({ ...borrowerInfo, [key]: value });
  };

  const submitBorrower = ({ firstName, lastName, relationship, city }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      relationship: relationship,
      city: city,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/borrower", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    setOpen(false);
  };

  return (
    <div>
      <Button id="buttons" variant="contained" onClick={() => setOpen(true)}>
        Add Borrower
      </Button>
      <Modal open={open}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Add Borrower
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              onChange={(e) => setBorrowerInfo("firstName", e.target.value)}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              sx={{ margin: "4px" }}
            />
            <TextField
              onChange={(e) => setBorrowerInfo("lastName", e.target.value)}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              sx={{ margin: "4px" }}
            />
            <TextField
              onChange={(e) => setBorrowerInfo("relationship", e.target.value)}
              id="outlined-basic"
              label="Relationship"
              variant="outlined"
              sx={{ margin: "4px" }}
            />
            <TextField
              onChange={(e) => setBorrowerInfo("city", e.target.value)}
              id="outlined-basic"
              label="Location"
              variant="outlined"
              sx={{ margin: "4px" }}
            />
          </Typography>
          <Button
            id="buttons"
            variant="contained"
            onClick={() => submitBorrower(borrowerInfo)}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BorrowerModal;
