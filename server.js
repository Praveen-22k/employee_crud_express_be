const express = require("express");
const app = express();
const cors = require("cors");
const globalerrorhandler = require("./middleware/globalerrorhandler");
const router = require("./routes/routes");
const connectdb = require("./dbconfig/dbconfig");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "https://employee-crud-react-fe.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
connectdb();
app.get("/", async (req, res) => {
  res.json({ message: "server running" });
});
app.use("/emp", router);

app.use(globalerrorhandler);
const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`server runs in ${Port}`);
});
