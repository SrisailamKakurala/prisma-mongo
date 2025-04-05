const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const limiter = require('./limiter');

const app = express();

app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', postRouter);
app.use('/api/auth', userRouter);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
