import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import $ from "jquery";

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

const BookModal = () => {
  const [open, setOpen] = useState(false);
  const [bookInfo, updateBookInfo] = useState({
    title: "",
    author: "",
  });

  const setBookInfo = (key, value) => {
    updateBookInfo({ ...bookInfo, [key]: value });
  };

  const submitBook = ({ title, author }) => {
    var settings = {
      url: "http://localhost:5000/api/book",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "text/plain",
      },
      data: JSON.stringify({
        title: title,
        author: author,
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });

    setOpen(false);
  };

  return (
    <div>
      <Button id="buttons" variant="contained" onClick={() => setOpen(true)}>
        Add Book
      </Button>
      <Modal open={open}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Add Book
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              onChange={(e) => setBookInfo("title", e.target.value)}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              sx={{ margin: "4px" }}
            />
            <TextField
              onChange={(e) => setBookInfo("author", e.target.value)}
              id="outlined-basic"
              label="Author"
              variant="outlined"
              sx={{ margin: "4px" }}
            />
          </Typography>
          <Button
            id="buttons"
            variant="contained"
            onClick={() => submitBook(bookInfo)}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BookModal;
