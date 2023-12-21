const express = require("express")
const app = express();
const port = 5000;

app.get("/api/data", (req, res) => {
    res.json("This message is from the backend");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});