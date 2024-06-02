require("dotenv").config();
const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require(`./${process.env.GOOGLE_SERVICE_ACCOUNT_KEY}`); // Use environment variable

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize((err, tokens) => {
  if (err) {
    console.error("Error authorizing client:", err);
    return;
  }
  console.log("Client authorized!");
});

app.post("/addRow", async (req, res) => {
  const { itemName, type, price, stock, status, notes } = req.body;
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SPREADSHEET_ID; // Replace with your spreadsheet ID

  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:A", // Assuming column A will always have data if a row is populated
    });

    const numRows = result.data.values ? result.data.values.length : 0;
    const nextRow = numRows + 1;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Sheet1!A${nextRow}:F${nextRow}`, // Adjust the range according to your sheet
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [itemName, type.join(", "), price, stock, status.join(", "), notes],
        ],
      },
    });
    res.status(200).send("Success");
  } catch (error) {
    console.error("Error adding row:", error);
    res.status(500).send({ error: error.message });
  }
});

app.get("/items", async (req, res) => {
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SPREADSHEET_ID; // Replace with your spreadsheet ID

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:F", // Adjust the range according to your sheet
    });

    const rows = response.data.values;

    // Check stock levels and update status if necessary
    const updatedRows = rows.map((row, index) => {
      if (index === 0) return row; // Skip the header row
      if (parseInt(row[3], 10) < 5) {
        row[4] = "Re-purchase needed"; // Update the status column
      }
      return row;
    });

    // Update the spreadsheet with the new statuses
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A2:F", // Adjust the range according to your sheet
      valueInputOption: "USER_ENTERED",
      resource: {
        values: updatedRows.slice(1), // Exclude the header row for update
      },
    });

    res.status(200).send(updatedRows);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send({ error: error.message });
  }
});

app.post("/updateRow", async (req, res) => {
  const { rowNumber, itemName, type, price, stock, status, notes } = req.body;
  const sheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = process.env.SPREADSHEET_ID; // Replace with your spreadsheet ID

  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!A${rowNumber}:F${rowNumber}`, // Update the specific row
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [itemName, type.join(", "), price, stock, status.join(", "), notes],
        ],
      },
    });
    res.status(200).send("Success");
  } catch (error) {
    console.error("Error updating row:", error);
    res.status(500).send({ error: error.message });
  }
});

app.get("/test", (req, res) => {
  res.status(200).send("Test endpoint working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
