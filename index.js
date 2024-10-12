const express = require('express');
const app = express();
const port = 3000;

const route= require('./routes/client/index.route');
route(app);


app.set('view engine', 'pug');
app.set('views', './views');


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
