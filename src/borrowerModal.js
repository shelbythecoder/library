import { Button, Modal, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"


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
  display: "flex",
  flexDirection: "column"
}


const BorrowerModal = ({open}) => {
    const [borrowerInfo, updateBorrowerInfo] = useState({firsName: "", lastName: "", relationship:"", city: ""})

    const setBorrowerInfo = (key, value) => {
        updateBorrowerInfo({...borrowerInfo, [key]: value})
    }

    const submitBorrower = ({firstName, lastName, relationship, city}) => {
        fetch(`http://localhost:5000/api/borrower?first_name=${firstName}&last_name=${lastName}&relationship=${relationship}&city=${city}`,{
            method: "POST"
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            <Modal
            open={open}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">Add Borrower</Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <TextField onChange={e=>setBorrowerInfo("firstName", e.target.value)} id="outlined-basic" label="First Name" variant="outlined"/>
                        <TextField onChange={e=>setBorrowerInfo("lastName", e.target.value)} id="outlined-basic" label="Last Name" variant="outlined"/>
                        <TextField onChange={e=>setBorrowerInfo("relationship", e.target.value)} id="outlined-basic" label="Relationship" variant="outlined"/>
                        <TextField onChange={e=>setBorrowerInfo("city", e.target.value)} id="outlined-basic" label="Location" variant="outlined"/>
                    </Typography>
                    <Button id="buttons" variant="contained" onClick={()=>submitBorrower(borrowerInfo)}>Submit</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default BorrowerModal