/**
 * Server configuration
 */
const port = process.env.DEV ? 5000 : 5000;

const morganMode = process.env.DEV ? 'dev' : 'tiny';

module.exports = {
  port,
  morganMode,
};
