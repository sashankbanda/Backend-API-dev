const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation for Employees and Tasks",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [
    "./src/routes/*.js", // Scan all route files for swagger comments
  ],
};

const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
