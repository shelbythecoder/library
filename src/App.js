import "./App.css";
import BorrowerModal from "./borrowerModal";
import BookModal from "./bookModal";

function App() {
  return (
    <div className="main-page">
      <div className="header">Shelby's Library</div>
      <div className="button-group">
        <BorrowerModal />
        <BookModal />
      </div>
    </div>
  );
}

export default App;
