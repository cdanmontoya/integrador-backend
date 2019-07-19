/**
 * Server configuration
 */
const port = process.env.DEV ? 5000 : 8080;

const morganMode = process.env.Dev ? 'dev' : 'tiny';

module.exports = {
    port,
    morganMode
};