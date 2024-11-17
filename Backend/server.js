const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authroute");
const itemRoutes = require("./routes/item");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employeeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use("/api/employees", employeeRoutes);
app.use("/api/items", itemRoutes);


app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
