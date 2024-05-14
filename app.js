const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./routes/api");

const connectToDatabase = require("./database/connect");
const cookieParser = require("cookie-parser");
const pagesRouter = require("./routes/pages");
const cors = require("./middlewares/cors");

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  express.static(path.join(__dirname, "public")),
  apiRouter,
  pagesRouter
);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
