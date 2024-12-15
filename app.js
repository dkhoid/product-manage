require('dotenv').config(); // Load environment variables

//This is the main entry point of the application. It is responsible for setting up the server, connecting to the database, and loading the routes.
const express = require('express');
const app = express();
const path = require('path')
const database = require('./config/database');

// Middleware
const bodyParser = require('body-parser');
const systemConfig = require('./config/system');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');



// Set up database connection
database.connect(); // Connect to the database

// Middleware configurations
app.use(methodOverride('_method')); // Enable method override for PUT and DELETE
app.use(bodyParser.urlencoded({ extended: false })); // Parse form data
app.use(cookieParser('IDONTKNOWHOWTOUSECOOKIE')); // Enable cookies
app.use(session({secret: 'yourSecretKey', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }})); // Session management
app.use(flash()); // Enable flash messages
app.use(express.static('public')); // Serve static files
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

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
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
