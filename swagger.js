const swaggerJsdoc = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description of my API",
  },
  host: "https://cs341-week-3-4-project.onrender.com",
  schemes: ["http, https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerJsdoc(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});
