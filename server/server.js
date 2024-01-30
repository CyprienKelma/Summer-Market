const express = require("express");
const dotenv = require("dotenv").config();

// const errorHandler = require("./middleware/errorHandler");
// const connectDb = require("./config/dbConnection");

//connectDb();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/users", require("./routes/usersRoutes"));


// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/cards", require("./routes/cardsRoutes"));
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});