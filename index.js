const express = require('express');
const app = express();

const path = require('path');

const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const articleRouter = require('./routes/article');
const authorRouter = require('./routes/author');

app.use('/', articleRouter);
app.use('/article', articleRouter);
app.use('/author', authorRouter);

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});