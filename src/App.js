import React, { useState, useEffect } from "react";
import "./App.css";
import FormComponent from "./components/FormComponent";
import ItemDropdown from "./components/ItemDropdown";

const App = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    type: [],
    price: "",
    stock: "",
    status: ["In Stock"],
    notes: "",
  });
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rowNumber, setRowNumber] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const data = await response.json();
      setItems(data.slice(1)); // Exclude the header row
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedItem = items.find((item) => item[0] === e.target.value); // Assuming item[0] is Item Name
    if (selectedItem) {
      setSelectedItem(selectedItem);
      setRowNumber(items.indexOf(selectedItem) + 2); // Get the correct row number (index + 2 to account for header row and 0-based index)
      setFormData({
        itemName: selectedItem[0],
        type: selectedItem[1].split(", "),
        price: selectedItem[2].replace(/[^0-9.-]+/g, ""), // Remove $ and other non-numeric characters
        stock: selectedItem[3],
        status: selectedItem[4].split(", "),
        notes: selectedItem[5],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked
          ? [...prevFormData[name], value]
          : prevFormData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverURL = selectedItem
      ? "http://localhost:5000/updateRow"
      : "http://localhost:5000/addRow";

    // Check stock level before submitting
    if (parseInt(formData.stock, 10) < 5) {
      formData.status = ["Re-purchase needed"];
    }

    try {
      const response = await fetch(serverURL, {
        method: "POST",
        body: JSON.stringify({ ...formData, rowNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          itemName: "",
          type: [],
          price: "",
          stock: "",
          status: ["In Stock"],
          notes: "",
        });
        setSelectedItem(null);
        fetchItems();
      } else {
        const text = await response.text();
        console.error("Error response from server:", text);
        alert("Failed to submit form. Error: " + text);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <FormComponent
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <hr className="dividing-line" />
        <ItemDropdown
          items={items}
          handleSelectChange={handleSelectChange}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
};

export default App;
