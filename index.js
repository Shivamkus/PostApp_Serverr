const express = require("express");
const port = 5500;
const app = express();
const cors = require("cors");
require("./config/db");
const auth = require("./routes/auth");
const Post = require("./routes/Post");
const path = require("path");


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "client", "build")));
res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use("/api/v1", auth);
app.use("/api/v2", Post);


app.listen(port, (error) => {
  if (error) {
    console.log("error on runnig server", error);
  } else {
    console.log(`server is running on port ${port}`);
  }
});