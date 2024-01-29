const express = require('express');
const app = express();

app.use("/users", require("./routes/users"));


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running well on port 3000");
});
