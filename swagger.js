const swaggerJsdoc = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description of my API",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerJsdoc(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});
