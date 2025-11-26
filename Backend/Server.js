// backend/server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./Databas.js/DB.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/employees", require("./Routes/Empolyes.js"));
app.use("/api/projects", require("./Routes/Project.js"));


app.get("/", (req, res) => res.send("Project Dashboard API"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
