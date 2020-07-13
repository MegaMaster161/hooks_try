/**
 * @author - Lazev Vadim
 * Точка входа сервера.
 * подключаем основные модули используя require
 * @type {createApplication}
 */
const express = require('express');
const path = require('path');
const config = require('config');
const bodyParser = require('body-parser');
const permission = require('./midlware/permission.middleware');
const fs = require('fs');


/**
 * Инициализируем приложение app и
 * иницилизируем вспомогательные библиотеки:
 * morgan - логгирование
 * bodyParser - парсер тела запроса HTTP
 * permission - работа с правами пользователя
 * @type {*|app}
 */

const app = express();
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
permission();

/** Конец блока общей инициализации */

/**
 * Блок подключения и инициализации маршрутизации
 */

const auth = require('./routes/auth');
const article = require('./routes/article');
//const admin = require('./routes/admin');
//const comment = require('./routes/comment');
//const user = require('./routes/user');

app.use('/api/v1/auth', auth);
app.use('/api/v1/article', article);



/** Конец блока маршрутизации */


/**
 * Работа с загрузкой файлов
 * подключаем multer
 */

const multer = require('multer');

/**
 * Функция для проверки наличия каталога
 * @return {string} pathofUpload - путь до каталога.
 */

const checkerDir = () => {

    /**
     * Структурируем обращение к временным каталогам
     * для удобства будем сортировать каталоги по дате
     * предварительно проводить проверку наличия каталога
     */



    const date = new Date();
    let str = '';
    const dateCreate = str.concat(`${date.getDate()}`,
                                  `${date.getMonth()}`,
                                  `${date.getYear()}`);
    const pathOfUpload = 'client/public/upload/'+`${dateCreate}`;


    fs.stat(path.resolve(__dirname, pathOfUpload), function(err) {
        if (!err) {
            console.log(`${path.resolve(__dirname, pathOfUpload)} - место загрузки файлов`);
        }
        else if (err.code === 'ENOENT') {
            fs.mkdir(path.resolve(__dirname, pathOfUpload), {recursive: false}, ((err) => {
                if (err) throw err;
            }))

        }
    });

/** устаревший метод
    const isDirectory = fs.existsSync(path.dirname(pathOfUpload));
    console.log(isDirectory);
    if(!isDirectory || ) {
        fs.mkdir(path.resolve(__dirname, pathOfUpload), {recursive: true}, ((err) => {
            if (err) throw err;
        }))
    }
 */
    console.log("Выполняем")
    return pathOfUpload;
    console.log(path.resolve() + pathOfUpload)
}


/**
 * Функция конфигурирующая/инициализирующая
 * и управляющая хранилищем.
 * @type {DiskStorage}
 */



const upload = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, checkerDir());
    },
    filename: (req, file, callback)  =>{
        callback(null, file.originalname);
    }
})

/**
 * Фильтр для расширений файлов.
 * @return {boolean} функция возвращает true или false
 */

const fileFilter = (req, file, callback) => {

    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};

/**
 * Инициализируем multer в контекст выполнения Express
 * @type {*|number}
 */

app.use(multer({storage:upload, fileFilter: fileFilter}).single("filedata"));

/**
 * Инициализируем multer в контекст выполнения Express
 * @type {*|number}
 */

app.post("/upload", async (req, res, next) => {

    let filedata = req.file;
    console.log('body', req.body);

    console.log('file', req.file);

    if(!filedata){

        res.status(403).json({ message: 'Ошибка при загрузке файла'})
    }
    else {
        res.status(201).json({ message: 'Файл успешно загружен', path:`${req.file.path}`})
    }
});


/** Конец блока загрузки файлов */

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

