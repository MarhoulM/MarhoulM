import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="thank-you-container">
        <h2>Děkujeme za Váš nákup.</h2>
        <button className="products" onClick={() => navigate("/products")}>
          Zpět na produkty
        </button>
      </div>
    </>
  );
};
export default ThankYou;
