const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const gadgets = require("./data/earphones.json");

// API endpoint
app.get("/api/earphones", (req, res) => {
  const { search, maxPrice } = req.query;
  let filtered = gadgets;

  if (search) {
    const keyword = search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
    );
  }

  if (maxPrice) {
    const max = parseInt(maxPrice);
    filtered = filtered.filter((item) => {
      const price = parseInt(item.price.replace(/\D/g, ""));
      return price <= max;
    });
  }

  res.json(filtered);
});

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// On root URL, send index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
