import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Prosím vyplňte všechna pole.");
      return;
    }
    if (!regex.test(formData.email)) {
      alert("Zadejte prosím platnou e-mailovou adresu.");
      return;
    }
    console.log("Formulář je validní, data k odeslání:", formData);
    alert("Formulář byl úspěšně odeslán (simulovaně)!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Jméno:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Zadejte své jméno."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Zadejte svůj email."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Zpráva:</label>
          <textarea
            name="message"
            id="message"
            placeholder="Napište nám, co vás zajímá."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button className="submit" type="submit">
            Odeslat
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
