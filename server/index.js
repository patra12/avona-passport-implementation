const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const passportauth = require('./passport-config');

const app = express()
const session = require('express-session');
//configuring or setting body parser to get and read data coming from frontend
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))







app.use(session({
  secret: "this is secret",
  resave: true,
  saveUninitialized: false,
}))


app.use(passportauth.initialize);
app.use(passportauth.session);
app.use(passportauth.setuser);





// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

//importing my own route which are actually link to the controller
const rout = require('./router')
app.use(rout);

//Testing route at home
app.get('/te', (req, res) => {
  //req.session.idw = "34";
  console.log(req.session.passport.user);
  res.send('hello from rout session is now = ' + req.session.passport.user);
});

app.get('/tes', (req, res) => {
  console.log(req.session.idw)
  res.send('finding setted session =>' + req.session.passport.user);
});

app.get('/lo', (req, res) => {
  // res.send('finding setted session before logout=>' + req.session.passport.user);
  req.logout();
  res.send('finding session after logout =>' + req.session.passport.user);
});

//static url for images
app.use('/product', express.static('uploads/product'));

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
