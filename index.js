const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const joyasRouter = require("./routes/joyasRoutes.js");
const router = require("./routes/joyasRoutes.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});












