const express = require('express');
const app = express();

const port = process.env.PORT || 5001;

app.use("/api/users", require("./server/routes/usersRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
