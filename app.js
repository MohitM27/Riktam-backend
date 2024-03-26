const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./src/routes");
const connectDB = require("./src/config/db");
const seedAdminUser = require("./src/helper/seed")
dotenv.config({ path: `.env` });

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Connect to MongoDB
connectDB();

// create default admin creaditials
seedAdminUser();
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
