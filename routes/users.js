var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Hi User");
});

router.post('/login', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(401).send();
        } else {
            res.send(authData.user);
        }
    });
});

router.post('/register', (req, res) => {
    newToken(req.body, (_token) => {
        res.json({token: _token});
    });
});

// New token
function newToken(user, callback) {
    jwt.sign({user}, 'secretkey', (err, token) => {
        callback(token);
    });
}

// Verify Token
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = router;