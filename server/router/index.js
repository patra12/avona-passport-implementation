//starting & configuring express server
const express = require('express');
const app = express.Router();
const passport = require('passport');
const multer = require("multer"); //for single and multiple file upload
const gm = require('gm').subClass({ imageMagick: true }); //for creating thumb or compressing image


//configuring Multer and gm i for fileupload and and thumb creation
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let str = __dirname;
        cb(null, "uploads/product/");
        gm(str.replace("/server/router", "") + '/uploads/product/' + file.originalname)
            .resize(240, 240)
            .write(str.replace("/server/router", "") + '/uploads/product/thumb/' + file.originalname, function (err) {
                if (!err) console.log('done');
            });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

//call all defined methods form controller
const call = require("../controller");
const product = require("../controller/product.js");
const settings = require("../controller/settings.js");
const mail = require("../controller/mail");
const pdf = require("../controller/pdf");
const auth = require("../controller/login");


/*========== testing routes ==========*/
//seted api route actual mthod is in controller
app.get('/test', call.test);

/*========== product page route ===========*/
//for productlist pages
app.get('/productlist', product.productlist);
//for add product pages
app.post('/addproduct', upload.single("image"), product.addproduct);
//for edit product pages to get a single record
app.get('/editproduct/:id', product.editproduct);
//for edit post product pages
app.put('/editpostproduct/:id', product.editpostproduct);
//for edit post product pages
app.get('/deleteproduct/:id', product.deleteproduct);


/*========== settings routes ==========*/
// Fetch all data from settings table
app.get('/settingsData', settings.settingsData);
// setting post data update
app.post('/settingsPostData', settings.settingsPostData);

/*========== mail routes ==========*/
app.post("/sendMail", mail.sendMail);

/*========== For PDF ==========*/
app.get('/pdf/:id', pdf.showPdf);

app.post('/blogin', passport.authenticate('local', { session: true }), (req, res, next) => {
    console.log(req.session.passport.user);
    return next();
}, auth.login);
//sending file where ever the code is nidded in project mainly in index.js 
module.exports = app;

