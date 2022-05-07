import './App.css';
import {Button} from "@mui/material"
import {useState} from "react";
import BorrowerModal from './borrowerModal';

function App() {
  const [openBorrower, setOpenBorrower] = useState(false)

  return (
    <div className='main-page'>
      <div className='header'>Shelby's Library</div>
      <div className='button-group'>
        <Button id="buttons" variant='contained' onClick={()=>setOpenBorrower(true)}>Add Borrower</Button> 
      </div>
      <BorrowerModal open={openBorrower}/>
    </div>
  );
}

export default App;
