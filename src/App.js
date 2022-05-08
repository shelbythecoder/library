import "./App.css";
import BorrowerModal from "./borrowerModal";
import BookModal from "./bookModal";
import CheckoutModal from "./checkoutModal";
import CheckoutTable from "./checkoutTable";

function App() {
  return (
    <div className="main-page">
      <div className="header">Shelby's Library</div>
      <div className="button-group">
        <BorrowerModal />
        <BookModal />
        <CheckoutModal />
      </div>
      <CheckoutTable />
    </div>
  );
}

export default App;
