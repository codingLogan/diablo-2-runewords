import express from "express";

const app = express();

app.use(express.static("src"));

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening");
});
