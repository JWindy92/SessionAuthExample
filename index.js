const express = require('express');
const session = require('express-session');
const app = express();

app.set('view engine', 'pug');

app.use(express.static('public'))
// var MemoryStore = session.MemoryStore;
app.use(session({
    secret: 'hard-to-guess-string',
}));
app.use(express.urlencoded());

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', (req, res) => {
    if (!req.session.is_authenticated){
        req.session.is_authenticated = false;
    }
    console.log(req.session)
    res.render('index', {title: 'Gusto', message: 'Welcome to Gusto!', is_auth: req.session.is_authenticated, session_string: JSON.stringify(req.session)})
})

app.get('/auth', (req, res) => {
    req.session.is_authenticated = true
    res.redirect('/')
})

const server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})