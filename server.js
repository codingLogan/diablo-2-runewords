import express from "express";

const app = express();

app.use(express.static("src"));

app.listen(3000, () => {
  console.log("App is listening");
});
