const express = require("express");
const app = express();
const mongodb = require("./DB/database");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config();

const port = process.env.PORT || 8080; // Use environment variable for port

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", require("./routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(
        `Database is listening and Server is running on http://localhost:${port}`
      );
    });
  }
});
