import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const createData = (name, title, author, genre, read, relationship, city) => {
  return {
    id: `${name}-${title}`,
    name,
    title,
    author,
    genre,
    read,
    relationship,
    city,
  };
};

const rows = [
  createData(
    "Pamela Smith",
    "The Maidens",
    "Alex Michaelides",
    "Thriller",
    true,
    "Mom",
    "Virginia"
  ),
  createData(
    "Pamela Smith",
    "Daisy Jones and the Six",
    "Taylor Jenkins Reid",
    "Historical Fiction",
    true,
    "Mom",
    "Virginia"
  ),
  createData(
    "Sandra Phil",
    "The Nightingale",
    "Kristin Hannah",
    "Historical Fiction",
    true,
    "Neighbor",
    "Virginia"
  ),
  createData(
    "Pamela Smith",
    "The Hunting Party",
    "Lucy Foley",
    "Thriller",
    true,
    "Mom",
    "Virginia"
  ),
  createData(
    "Audery Dolly",
    "The Four Winds",
    "Kristin Hannah",
    "Historical Fiction",
    true,
    "Neighbor",
    "Virginia"
  ),
];

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "title", headerName: "Title", width: 150 },
  { field: "author", headerName: "Author", width: 150 },
  { field: "genre", headerName: "Genre", width: 150 },
  { field: "read", headerName: "Read?", editable: true, width: 150 },
  { field: "relationship", headerName: "Relationship", width: 150 },
  { field: "city", headerName: "Location", width: 125 },
];

const CheckoutTable = () => {
  return (
    <div
      style={{
        height: 400,
        width: "96%",
        margin: "24px",
        backgroundColor: "rgb(72, 103, 66, 0.9)",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default CheckoutTable;
