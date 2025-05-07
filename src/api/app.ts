import express from "express";

const app = express();

const PORT = process.env.PORT;

app.get("/", (request, response) => {
  console.log(response);
  response.status(200).send("Hello World");
});

export default app;
