const connection = require('./db');
const passport = require('passport');
const localstatergy = require('passport-local');
const test = require("passport-http/strategies/basic")


//making login statergy
passport.use(new localstatergy({ usernameField: 'email' }, function (email, password, done) {
    userMatchingQurey = "SELECT * FROM `users` WHERE `email` = '" + email + "' and password = '" + password + "'";
    connection.query(userMatchingQurey, (err, rows) => {
        if (err) { return done(err); }
        if (!rows.length) {
            return done(null, false);
        }
        if (!(rows[0].password == password)) {
            return done(null, false);
        }
        return done(null, rows[0]);
    });
}));

// eslint-disable-next-line no-underscore-dangle
/**
 * @param userx holds the row or the value cooming from database table
 * here i uses userx because of checking thst the name of the parameters 
 * can be written as any name or not.found that it can be written as any name you want 
 * but "user" is most common.
 * @param donez is the callback
 * also it can be named anything you want
 * the callback needs tow parameters 
 * one is has any error or not
 * and another one is the field you want to use as a tocken (usually it is tabel id most of the time)
 */
passport.serializeUser((userx, donez) => { donez(null, userx.id) });

passport.deserializeUser((duser, done) => {
    try {
        // selectUserQuery = "SELECT * FROM `users` WHERE  `id` = '" + id + "'";
        // selectedUser = connection.query(selectUserQuery, (err, row) => {
        //     if (!err) {
        //         return row[0];
        //     }
        // });

        console.log("inside dese => " + duser);
        return done(null, duser);

    }
    catch (err) {
        console.log("deserilize err==>" + err);
        return done(err);
    }
});

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    setuser: (req, res, next) => {
        res.locals.user = req.user;
        return next();
    }
}