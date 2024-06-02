import React from "react";

const ItemDropdown = ({ items, handleSelectChange, selectedItem }) => {
  return (
    <div className="edit-container">
      <h2 className="section-label">Or edit an existing item</h2>
      <label className="edit-label">
        Select Item to Edit:
        <br />
        <select
          className="edit-selector"
          onChange={handleSelectChange}
          value={selectedItem ? selectedItem[0] : ""}
        >
          <option value="" disabled>
            Select item
          </option>
          {items.map((item, index) => (
            <option key={index} value={item[0]}>
              {item[0]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default ItemDropdown;
