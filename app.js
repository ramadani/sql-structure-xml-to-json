const express = require('express');
const app = express();

const sqlTables = require('./sql.json');

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (_, res) => {
  res.render('index', { title: 'Hello, Great!', tables: sqlTables });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
