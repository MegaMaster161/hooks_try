
//основные модули
const express = require('express');
const path = require('path');
const config = require('config');
const bodyParser = require('body-parser');
const permission = require('./midlware/permission.middleware');
const cors = require('cors');

//роуты
//const admin = require('./routes/admin');
const auth = require('./routes/auth');
const article = require('./routes/article');
//const comment = require('./routes/comment');
//const user = require('./routes/user');




//подключаем каталог клиента

//инициируем приложение
const app = express();
//подключаем логгирование


app.use(cors());


app.use(require('morgan')('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// подгружаем права
permission();
//парсим вопросы

//Инициируем роуты
app.use('/api/v1/auth', auth);
app.use('/api/v1/article', article);

const PORT = config.get('port') || 5000;


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//устанавливаем прослушку порта
app.listen(8000, ()=> {
    console.log(`This is port ${PORT}...`);
    });

