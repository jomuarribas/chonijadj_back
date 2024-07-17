require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const http = require("http")
const { chonijappDB } = require("./config/chonijappDB");
const { initSocket } = require("./api/utils/socket");
const songRoutes = require("./api/routes/song");

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = http.createServer(app)
initSocket(httpServer);

chonijappDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());
app.use(cors());

//ROUTES

app.use("/songs", songRoutes);
app.use("*/", (req, res) => {
  return res.status(404).json("Route not found");
});


httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});