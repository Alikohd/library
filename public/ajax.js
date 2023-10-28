function loadFilterStock(){
    callAjaxGet((responseData)=>{
        var bookList = document.getElementById('bookList');
        var availabilityCheckbox = document.getElementById('availabilityCheckbox');
        bookList.innerHTML = ''
        const booksData = responseData.booksData;

        booksData.forEach(function (book) {
            if (availabilityCheckbox.checked && !book.inStock) {
                return; // Пропустить книги, если чекбокс отмечен и нет даты возврата
            }

            const listItem = document.createElement('li');
            const title = document.createElement('a');
            title.setAttribute('href', `/books/${book.id}`);
            title.textContent = book.title;
            listItem.appendChild(title);
            const authorSpan = document.createElement('span');
            authorSpan.className = 'book_field';
            authorSpan.textContent = 'Автор: ' + book.author;
            listItem.appendChild(authorSpan);

            const yearSpan = document.createElement('span');
            yearSpan.className = 'book_field';
            yearSpan.textContent = 'Год выпуска: ' + book.releaseYear;
            listItem.appendChild(yearSpan);

            const returnSpan = document.createElement('span');
            returnSpan.className = 'book_field';
            returnSpan.textContent = 'Возврат: ' + (book.returnDate ? book.returnDate : '')
            listItem.appendChild(returnSpan);

            bookList.appendChild(listItem);
        })
    })
}


function loadFilterExpired(){
    callAjaxGet((responseData)=>{
        var bookList = document.getElementById('bookList');
        var expiredCheckbox = document.getElementById('returnExpiredCheckbox');
        bookList.innerHTML = ''
        const booksData = responseData.booksData;
        booksData.forEach(function (book) {
            let i = 0
            console.log("kniga", booksData[i]);
            // console.log("date", Date.now());
            // console.log(Date.parse(book.returnDate))
            if ((expiredCheckbox.checked) && (Date.parse(booksData[i].returnDate) < Date.now() || booksData[i].returnDate === null)) {
                return; // Пропустить книги, если чекбокс отмечен и нет даты возврата
            }

            const listItem = document.createElement('li');
            const title = document.createElement('a');
            title.setAttribute('href', `/books/${book.id}`);
            title.textContent = book.title;
            listItem.appendChild(title);
            const authorSpan = document.createElement('span');
            authorSpan.className = 'book_field';
            authorSpan.textContent = 'Автор: ' + book.author;
            listItem.appendChild(authorSpan);

            const yearSpan = document.createElement('span');
            yearSpan.className = 'book_field';
            yearSpan.textContent = 'Год выпуска: ' + book.releaseYear;
            listItem.appendChild(yearSpan);

            const returnSpan = document.createElement('span');
            returnSpan.className = 'book_field';
            returnSpan.textContent = 'Возврат: ' + (book.returnDate ? book.returnDate : '')
            listItem.appendChild(returnSpan);

            bookList.appendChild(listItem);
        })
    })
}


function loadPost() {
    const openDialogButton = document.getElementById('openDialogButton');
    const myDialog = document.getElementById('myDialog');
    const inputTitle = document.getElementById('inputTitle');
    const inputAuthor = document.getElementById('inputAuthor');
    const inputYear = document.getElementById('inputYear');
    const applyButton = document.getElementById('applyButton');
    const closeDialogButton = document.getElementById('closeDialogButton');

    myDialog.showModal();


    closeDialogButton.addEventListener('click', function() {
        myDialog.close();
    });

    applyButton.addEventListener('click', async function () {
        const title = inputTitle.value;
        const author = inputAuthor.value;
        const year =  !isNaN(parseInt(inputYear.value))? inputYear.value : null;

        if (title && author && year) {
            callAjaxPost( title, author, year, (responseData)=>{
                const booksData = responseData.booksData;

                const bookList = document.getElementById('bookList');
                bookList.innerHTML = ''

                booksData.forEach(function (book) {
                    const listItem = document.createElement('li');
                    const title = document.createElement('a');
                    title.setAttribute('href', `/books/${book.id}`);
                    title.textContent = book.title;
                    listItem.appendChild(title);
                    const authorSpan = document.createElement('span');
                    authorSpan.className = 'book_field';
                    authorSpan.textContent = 'Автор: ' + book.author;
                    listItem.appendChild(authorSpan);

                    const yearSpan = document.createElement('span');
                    yearSpan.className = 'book_field';
                    yearSpan.textContent = 'Год выпуска: ' + book.releaseYear;
                    listItem.appendChild(yearSpan);

                    const returnSpan = document.createElement('span');
                    returnSpan.className = 'book_field';
                    returnSpan.textContent = 'Возврат: ' + (book.returnDate ? book.returnDate : '')
                    listItem.appendChild(returnSpan);

                    bookList.appendChild(listItem);
                })

            });
            myDialog.close();
            //window.location.reload();
        }
    });
}

function callAjaxPost(title, author, year, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/library", true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify({
        title: title,
        author: author,
        releaseYear: year
    }))


    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText)
            console.log("hello", data);
            callback(data)
        }
    };
}



function callAjaxReaderPost(id, name, date, callback) {
    var xhttp = new XMLHttpRequest();
    var url = "/books/" + id;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify({
        name: name,
        date: date,
    }))

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText)
            callback(data)
        }
    };
}


function callAjaxBookDelete(id, callback) {
    var xhttp = new XMLHttpRequest();
    var url = "/books/" + id;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify({
        id: id
    }))


    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText)
            callback(data)
        }
    };
}

function loadBookDelete() {
    const bookIdElement = document.getElementById('bookId');
    var id = bookIdElement.textContent;
    const confirmDelete = confirm('Вы уверены, что хотите удалить эту книгу?');

    if (confirmDelete) {
    callAjaxBookDelete( id,
        (responseData)=>{
            window.location.href = '/library';
        }
    )}
    //window.location.reload();
}


function callAjaxReaderDelete(id, callback) {
    var xhttp = new XMLHttpRequest();
    console.log("alive")
    var url = "/reader" + id;
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify({
        id: id
    }))

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText)
            callback(data)
        }
    };
}


function loadReaderDelete() {
    const bookIdElement = document.getElementById('bookId');
    const deleteButton = document.getElementById('deleteReaderButton');
        var id = bookIdElement.textContent;
        callAjaxReaderDelete( id,
            (responseData)=>{
                console.log("aboba")
                console.log(responseData);
                const book = responseData.finded;
                console.log("моя книга", book);
                const bookList = document.getElementById('bookId');
                bookList.innerHTML = book.id;
                // зря всё стирал и создавал новые, надо помять textContent тех что есть, потом исправлю
                const listItem = document.createElement('li');
                const author = document.createElement('p');
                author.textContent = "Автор: " + book.author;
                const releaseYear = document.createElement('p');
                releaseYear.textContent = "Год выпуска: " + book.releaseYear;
                const returnDate = document.createElement('p');
                returnDate.textContent = "Дата возврата: " +(book.returnDate ? book.returnDate : '') ;
                const inStock = document.createElement('p');
                inStock.textContent = "В наличии: " + book.inStock;
                const reader = document.createElement('p');
                reader.textContent = "Читатель: " + (book.reader ? book.reader : '')

                listItem.appendChild(author);
                listItem.appendChild(releaseYear);
                listItem.appendChild(returnDate);
                listItem.appendChild(inStock);
                listItem.appendChild(reader);
                bookList.appendChild(listItem);

        }
            //window.location.reload();
    )
}


function loadReaderPost() {
    const openDialogButton = document.getElementById('addReader');
    const myDialog = document.getElementById('readerDialog');
    const inputName = document.getElementById('inputName');
    const inputDate = document.getElementById('inputDate');

    const bookIdElement = document.getElementById('bookId');
    const applyButton = document.getElementById('applyReaderButton');
    const deleteButton = document.getElementById('deleteReaderButton');
    const closeDialogButton = document.getElementById('closeReaderDialogButton');

    myDialog.showModal();

    closeDialogButton.addEventListener('click', function() {
        myDialog.close();
    });


    applyButton.addEventListener('click', async function () {
        const name = inputName.value;
        const date = inputDate.value;

        if (name && date) {
            var id = bookIdElement.textContent;
            callAjaxReaderPost( id, name, date,
                (responseData)=>{

                const book = responseData.finded;


                const bookList = document.getElementById('bookId');
                bookList.innerHTML = book.id;
                // зря всё стирал и создавал новые, надо помять textContent тех что есть, потом исправлю
                const listItem = document.createElement('li');
                const author = document.createElement('p');
                author.textContent = "Автор: " + book.author;
                const releaseYear = document.createElement('p');
                releaseYear.textContent = "Год выпуска: " + book.releaseYear;
                const returnDate = document.createElement('p');
                returnDate.textContent = "Дата возврата: " + book.returnDate;
                const inStock = document.createElement('p');
                inStock.textContent = "В наличии: " + book.inStock;
                const reader = document.createElement('p');
                reader.textContent = "Читатель: " + book.reader;

                listItem.appendChild(author);
                listItem.appendChild(releaseYear);
                listItem.appendChild(returnDate);
                listItem.appendChild(inStock);
                listItem.appendChild(reader);
                bookList.appendChild(listItem);

            }
            )
            myDialog.close();
            //window.location.reload();
        }
    });
}


function callAjaxBookChangePut(id, author, title, year, callback) {
    var xhttp = new XMLHttpRequest();
    var url = "/books/" + id;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(JSON.stringify({
        author: author,
        title: title,
        year: year
    }))

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText)
            callback(data)
        }
    };
}


function loadChangePut() {
    const openDialogButton = document.getElementById('returnToListButton');
    const myDialog = document.getElementById('changeDialog');
    const inputAuthor = document.getElementById('inputBookAuthor');
    const inputTitle = document.getElementById('inputBookTitle');
    const inputYear = document.getElementById('inputBookYear');

    const htmlTitle = document.getElementById('bookTitle');

    const bookIdElement = document.getElementById('bookId');
    const applyButton = document.getElementById('applyChangeButton');
    const closeDialogButton = document.getElementById('closeChangeDialogButton');

    myDialog.showModal();

    closeDialogButton.addEventListener('click', function() {
        myDialog.close();
    });

    applyButton.addEventListener('click', async function () {
        const author = inputAuthor.value;
        const title = inputTitle.value;
        const year = inputYear.value;

        var id = bookIdElement.textContent;
        callAjaxBookChangePut( id, author, title, year,
            (responseData)=>{

                const book = responseData.finded;

                const bookList = document.getElementById('bookId');
                bookList.innerHTML = book.id;
                htmlTitle.textContent = book.title;
                // зря всё стирал и создавал новые, надо помять textContent тех что есть, потом исправлю
                const listItem = document.createElement('li');
                const author = document.createElement('p');
                author.textContent = "Автор: " + book.author;
                const releaseYear = document.createElement('p');
                releaseYear.textContent = "Год выпуска: " + book.releaseYear;
                const returnDate = document.createElement('p');
                returnDate.textContent = "Дата возврата: " + (book.returnDate ? book.returnDate : '');
                const inStock = document.createElement('p');
                inStock.textContent = "В наличии: " + book.inStock;
                const reader = document.createElement('p');
                reader.textContent = "Читатель: " + (book.reader ? book.reader : '');

                // htmlTitle.appendChild(bookList);
                bookList.appendChild(listItem)
                listItem.appendChild(author);
                listItem.appendChild(author);
                listItem.appendChild(releaseYear);
                listItem.appendChild(returnDate);
                listItem.appendChild(inStock);
                listItem.appendChild(reader);

            }
        )
            myDialog.close();
            //window.location.reload();
    });
}



function callAjaxGet(callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/data", true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText)
            callback(data)
        }
    };


    xhttp.send();



}

