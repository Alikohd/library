let express = require("express");
let bodyParser = require('body-parser');

let router = express.Router();
const {readData, saveData} = require("./public/data_rw")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let booksData = readData()

router.get('/', (req, res, next) => {
    res.render('index', {
        title: "Home Library"
    });
    next();
});

router.get('/books/:id', (req, res, next) => {
    let id = req.params.id;
    for (book of booksData) {
        if (book.id === parseInt(id)) {
            res.render('book', {
                book: book
            });
            return; // Добавьте return, чтобы прервать цикл после нахождения книги
        }
    }
    next();
});

router.post('/books/:id', (req, res, next) => {
    let id = req.params.id;
    let finded = null
    let body = req.body
    for (book of booksData) {
        if (book.id === parseInt(id)) {
            if (book.inStock){
            book.reader = body.name
            book.returnDate = body.date
            book.inStock = false
            finded = book
        }
        }
    }
    saveData(booksData);
    console.log(finded);
    res.json({ finded });
    next();
});

router.put('/books/:id', (req, res, next) => {
    let id = req.params.id;
    let finded = null
    let body = req.body
    for (book of booksData) {
        if (book.id === parseInt(id)) {
            book.author = body.author
            book.title = body.title
            book.releaseYear = body.year
            finded = book
        }
    }
    saveData(booksData);
    console.log(finded);
    res.json({ finded });
    next();
});

router.delete('/reader:id', (req, res, next) => {
    // console.log("here")
    let id = req.params.id;
    let finded = null
    let body = req.body
    for (book of booksData) {
        if (book.id === parseInt(id)) {
            book.reader = null
            book.returnDate = null
            book.inStock = true
            finded = book
        }
    }
    saveData(booksData);
    res.json({ finded });
    next();
});

router.delete('/books/:id', (req, res, next) => {
    let id = req.params.id;
    let body = req.body
    booksData = booksData.filter(function(book) {
        return book.id !== parseInt(id);
    });
    console.log(booksData);
    saveData(booksData);
    res.json("good" );
    next();
});


router.get('/library', (req, res, next) => {
    res.render('library', { books: booksData });
    next();
});

router.get('/data', (req, res, next) => {
    res.json({ booksData });
    next();
});


router.post("/library", (req, res, next)=>{
    let body = req.body
    booksData.push({
        id: (booksData.length > 0) ? booksData[booksData.length - 1].id + 1 : 0,
        title: body.title,
        author: body.author,
        releaseYear: body.releaseYear,
        returnDate: null,
        inStock: true,
        reader: null
    })
    saveData(booksData);
    res.json({ booksData });
    next();
});


module.exports = router;



