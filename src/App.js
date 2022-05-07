import "./App.css";
import BorrowerModal from "./borrowerModal";
import BookModal from "./bookModal";
import CheckoutModal from "./checkoutModal";

function App() {
  return (
    <div className="main-page">
      <div className="header">Shelby's Library</div>
      <div className="button-group">
        <BorrowerModal />
        <BookModal />
        <CheckoutModal />
      </div>
    </div>
  );
}

export default App;
