require('dotenv').config();
var express = require('express');
var app = express();

var bodyParser = require('body-parser'); // lấy giữ liệu người dùng 
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const port = 3000;
app.set('view engine', 'pug'); // dùng pug giống như html 
app.set('views', './Views');

var authRouter = require('./routers/auth.route'); // dùng để  chuyển tới file đăng nhập
var userRouter = require('./routers/users.router'); // file người dùng 
var authMiddeware = require('./middeware/auth.middeware');
// use app use
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

app.use('/users', express.static('public'));

app.use('/auth', authRouter);
app.use('/users', authMiddeware.requireAuth, userRouter);



app.get('/', (req, res) => {
    res.render('index', {
        name: 'Xuan'
    });
});


app.listen(port, function() {
    console.log('Server listening on port' + port);

});