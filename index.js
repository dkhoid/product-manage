require('dotenv').config();

const express = require('express');

const database = require('./config/database');

const systemConfig = require('./config/system');

const route = require('./routes/client/index.route');
const adminRoute = require('./routes/admin/index.route');

const app = express();
const port = process.env.PORT;




database.connect()//kết nối database

//route
route(app);
adminRoute(app);


//app local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static('public'));//sử dụng file static

app.set('view engine', 'pug');
app.set('views', './views');


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
