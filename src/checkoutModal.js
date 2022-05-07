import {
  Button,
  Modal,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import $ from "jquery";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const books = [
  "The Four Winds",
  "The Hunting Party",
  "Sharp Objects",
  "The Nightingale",
  "Beautiful World, Where Are You",
  "Song of Achilles",
  "Daisy Jones and the Six",
  "The Maidens",
  "The Midnight Library",
];

const borrowers = [
  "Pamela Smith",
  "Shelby Kiefner",
  "Sandra Phil",
  "Audrey Dolly",
];

const CheckoutModal = () => {
  const [open, setOpen] = useState(false);
  const [checkoutInfo, updateCheckoutInfo] = useState({
    books: [],
    borrower: [],
  });

  const handleBooksChange = ({ target }) => {
    const { value } = target;
    updateCheckoutInfo({
      ...checkoutInfo,
      books: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleBorrowerChange = ({ target }) => {
    const { value } = target;
    updateCheckoutInfo({
      ...checkoutInfo,
      borrower: value,
    });
  };

  const submitCheckoutInfo = ({ books, borrower }) => {
    var settings = {
      url: "http://localhost:5000/api/book",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "text/plain",
      },
      data: JSON.stringify({
        books: books,
        borrower: borrower,
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
        Checkout Book
      </Button>
      <Modal open={open}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Checkout Book
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-simple-select-label">Borrower</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={checkoutInfo.borrower}
                onChange={handleBorrowerChange}
              >
                {borrowers.map((borrower) => (
                  <MenuItem key={borrower} value={borrower}>
                    {borrower}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">Books</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={checkoutInfo.books}
                onChange={handleBooksChange}
                input={<OutlinedInput label="Books" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {books.map((book) => (
                  <MenuItem key={book} value={book}>
                    <Checkbox checked={checkoutInfo.books.indexOf(book) > -1} />
                    <ListItemText primary={book} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
          <Button
            id="buttons"
            variant="contained"
            onClick={() => submitCheckoutInfo(checkoutInfo)}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckoutModal;
