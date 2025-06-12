const ThankYou = () => {
  return (
    <>
      <h2>Děkujeme za Váš nákup.</h2>
      <button onClick={() => navigate("/products")}>Zpět na produkty</button>
    </>
  );
};
export default ThankYou;
