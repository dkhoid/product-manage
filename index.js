require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();

const database = require('./config/database');
const systemConfig = require('./config/system');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer');

// Set up database connection
database.connect(); // Connect to the database

// Middleware configurations
app.use(methodOverride('_method')); // Enable method override for PUT and DELETE
app.use(bodyParser.urlencoded({ extended: false })); // Parse form data
app.use(cookieParser('IDONTKNOWHOWTOUSECOOKIE')); // Enable cookies
app.use(session({secret: 'yourSecretKey', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }})); // Session management
app.use(flash()); // Enable flash messages
app.use(express.static('public')); // Serve static files

// App locals
app.locals.prefixAdmin = systemConfig.prefixAdmin; // Set app local variable

// View engine setup
app.set('view engine', 'pug');
app.set('views', './views');


// Routes
const clientRoutes = require('./routes/client/index.route');
const adminRoutes = require('./routes/admin/index.route');
clientRoutes(app); // Load client routes
adminRoutes(app); // Load admin routes

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
