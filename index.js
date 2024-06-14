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

app.use('/', articleRouter);
app.use('/article', articleRouter);

app.get('/author/:id', (req, res) => {
    let query = `SELECT au.id as author_id, au.name as author, ar.name, ar.published, ar.slug, ar.image, ar.body FROM article ar JOIN author au on ar.author_id = au.id WHERE au.id= "${req.params.id}"`;
    let articles = [];
    let author_name
    con.query(query, function(err, result) {
        if (err) throw err;
        author_name = result[0].author;
        console.log(author_name);
        articles = result;
        console.log(articles);
        res.render('author', { articles: articles, author_name: author_name});
    });
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});