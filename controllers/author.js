const con = require('../utils/db');

const getArticlesByAuthorId = async (req, res) => {
    let query = `SELECT au.id as author_id, au.name as author, ar.name, ar.published, ar.slug, ar.image, ar.body FROM article ar JOIN author au on ar.author_id = au.id WHERE au.id= "${req.params.id}"`;
    let articles = [];
    let author_name
    con.query(query, function(err, result) {
        if (err) throw err;
        author_name = result[0].author;
        articles = result;
        res.render('author', { articles: articles, author_name: author_name});
    });
};

module.exports = {getArticlesByAuthorId};