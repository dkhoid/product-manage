const PATH_ADMIN = '/admin';
const session = require('express-session');

module.exports = {
    prefixAdmin: '/admin',
    sessionSecret: process.env.SESSION_SECRET,
    sessionTimeout: 30 * 60 * 1000
};

module.exports = {
    prefixAdmin: PATH_ADMIN
}