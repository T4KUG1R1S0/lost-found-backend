const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = "./data/items.json";

// ambil semua data
app.get("/items", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// tambah barang hilang
app.post("/items", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const newItem = {
    id: Date.now(),
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    status: "hilang"
  };
  data.push(newItem);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Data berhasil ditambahkan" });
});

// update status (admin)
app.put("/items/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const item = data.find(i => i.id == req.params.id);
  item.status = req.body.status;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Status diubah" });
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

});

app.listen(3000, () => {
  console.log("Server running di http://localhost:3000");
});
