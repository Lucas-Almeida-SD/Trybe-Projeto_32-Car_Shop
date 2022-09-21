// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.output.json';
const endpoitsFiles = ['./src/app.ts'];

swaggerAutogen(outputFile, endpoitsFiles);