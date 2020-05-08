var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connection = require('./mysql/mysqlConnect');
var Admin = require('./routes/Admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getSession = require('./routes/getSession');
var submitContact = require('./routes/submitContact');
var random = require('random');
var app = express();
var session = require('express-session');
const maxAgeSession = 1000 * 60 * 60 * 2; 

app.use(session({
  name: 'SID',
  resave: false,
  saveUninitialized: false, 
  secret: 'kH7YOLI#Nl&#*Tr6p9874olbndiutg@3029-3',
  cookie: {
    maxAge: maxAgeSession,
    sameSite: true,
  }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var sess;
// app.use('/', indexRouter);
process.env.NODE_ENV = 'production';
//Serve static files in case of production
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client'));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','index.html'))
  })
}

// app.use('/users', usersRouter);

app.use('/submitContact',submitContact);
app.use('/about',indexRouter)
const initSession = (req,res,next) =>{
  sess=req.session;
  sess.userId;
  next();
}

// app.use('/admin', initSession, Admin);

// app.get('/getSession', (req,res) => {
//   sess=req.session;
//   console.log(sess)
//   res.send({data : sess.userId})
// });

// app.get('/logout', (req,res) => {
//   req.session.destroy(err => {
//       if(err){
//           return res.end("FAILED TO DESTROY SESSION");
//       }
//       res.redirect('http://localhost:3000/');
//   })
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
