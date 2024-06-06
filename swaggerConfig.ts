// src/swaggerConfig.ts

import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Travel News API',
            version: '1.0.0',
            description: 'API documentation for the Travel News application',
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    } ,
    apis: ['./src/routes/*.ts'], // Path to your route files
};

const specs = swaggerJsdoc(options);

export default specs;
