const db = require('../db');
const passport = require('passport');
var methods = {
    login: (req, res) => {
        // passport.authenticate('local', {
        //     successRedirect: '/nvadmin/settings',
        //     failureRedirect: '/nvadmin'
        // })
        // console.log(req);
        // res.send(req);
        // res.end(req.sessionID);
        console.log(req.session.passport.user);

        req.session.user = req.user.id;
        res.send('finding setted session =>' + req.session.passport.user);
        // res.json(req.session.user);

    }
    // @rFc0D%&#!
}

module.exports = methods;