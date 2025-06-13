const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Path to CID log file
const logFilePath = path.join(__dirname, "cid-log.json");

// Ensure the file exists
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, JSON.stringify([]));
}

// POST /log-cid
app.post("/log-cid", (req, res) => {
  const { cid } = req.body;
  if (!cid) {
    return res.status(400).json({ error: "CID is required" });
  }

  try {
    const existingData = JSON.parse(fs.readFileSync(logFilePath, "utf8"));
    existingData.push({
      cid,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(logFilePath, JSON.stringify(existingData, null, 2));
    res.status(200).json({ message: "CID logged successfully." });
  } catch (err) {
    console.error("Logging error:", err);
    res.status(500).json({ error: "Failed to log CID" });
  }
});

// GET /cid-log (optional - for debugging or viewing logs)
app.get("/cid-log", (req, res) => {
  const data = fs.readFileSync(logFilePath, "utf8");
  res.json(JSON.parse(data));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
