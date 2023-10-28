let express = require("express");
// import {Book} from "./book.js";
let routes =require("./routes")

const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', 'views');


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

app.use("/", routes);


