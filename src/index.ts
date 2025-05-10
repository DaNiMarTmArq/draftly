import "./env.config";
import app from "./api/app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
