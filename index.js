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

const mysql = require('mysql');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, function(err, result) {
        if (err) throw err;
        articles = result;
        console.log(articles);
        res.render('index', { articles: articles });
    });
});

app.get('/article/:slug', (req, res) => {
    let query = `SELECT au.name as author, ar.name, ar.published, ar.slug, ar.image, ar.body FROM article ar JOIN author au on ar.author_id = au.id WHERE slug= "${req.params.slug}"`;
    let article
    con.query(query, function(err, result) {
        if (err) throw err;
        article = result;
        console.log(article);
        res.render('article', { article: article });
    });
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});