require('dotenv').config();

const express = require('express');

const database = require('./config/database');
database.connect()//kết nối database

const systemConfig = require('./config/system');

const methodOverride = require('method-override');

const route = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');


const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));//sử dụng method-override



//route
route(app);
adminRoute(app);


//app local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static('public'));//sử dụng file static

app.set('view engine', 'pug');
app.set('views', './views');


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
