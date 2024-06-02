import React from "react";

const FormComponent = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="section-label">Add a new item</h2>
        <label className="form-label">
          Item Name:
          <input
            className="form-input"
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Type:
          <br />
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="type"
              value="Category 1"
              onChange={handleChange}
              checked={formData.type.includes("Category 1")}
            />
            Category 1
          </label>
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="type"
              value="Category 2"
              onChange={handleChange}
              checked={formData.type.includes("Category 2")}
            />
            Category 2
          </label>
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="type"
              value="Category 3"
              onChange={handleChange}
              checked={formData.type.includes("Category 3")}
            />
            Category 3
          </label>
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="type"
              value="Category 4"
              onChange={handleChange}
              checked={formData.type.includes("Category 4")}
            />
            Category 4
          </label>
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Price:
          <input
            className="form-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Stock:
          <input
            className="form-input"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Status:
          <br />
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="status"
              value="In Stock"
              onChange={handleChange}
              checked={formData.status.includes("In Stock")}
            />
            In Stock
          </label>
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="status"
              value="Temporarily Unavailable"
              onChange={handleChange}
              checked={formData.status.includes("Temporarily Unavailable")}
            />
            Temporarily Unavailable
          </label>
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="status"
              value="Re-purchase needed"
              onChange={handleChange}
              checked={formData.status.includes("Re-purchase needed")}
            />
            Re-purchase needed
          </label>
          <label>
            <input
              className="form-checkbox"
              type="checkbox"
              name="status"
              value="Sold Out"
              onChange={handleChange}
              checked={formData.status.includes("Sold Out")}
            />
            Sold Out
          </label>
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Notes:
          <textarea
            className="form-textarea"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
