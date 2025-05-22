import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Draftly API",
    version: "1.0.0",
    description: "API documentation for Draftly backend",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      Author: {
        type: "object",
        properties: {
          authorId: {
            type: "string",
            format: "uuid",
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
          fullName: {
            type: "string",
            example: "Jane Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "jane@example.com",
          },
          imageURL: {
            type: "string",
            format: "uri",
            example: "https://example.com/images/jane.jpg",
          },
        },
        required: ["authorId", "fullName", "email", "imageURL"],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/api/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
