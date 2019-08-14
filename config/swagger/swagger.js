const swaggerDoc = (app) => {
    const expressSwagger = require('express-swagger-generator')(app);

    let options = {
        swaggerDefinition: {
            info: {
                description: 'App endpoints documentation',
                title: 'App documentation',
                version: '0.0.0',
            },
            host: 'localhost:8080',
            basePath: '/db',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['./**/route.js'] //Path to the API handle folder
    };
    expressSwagger(options);
}

module.exports = {
    swaggerDoc
}