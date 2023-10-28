class Book {
    constructor(id, title, author, releaseYear, returnDate = null, inStock = true, reader = null) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.releaseYear = releaseYear;
        this.returnDate = returnDate;
        this.inStock = inStock;
        this.reader = reader;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const openDialogButton = document.getElementById('openDialogButton');
    const myDialog = document.getElementById('myDialog');
    const inputTitle = document.getElementById('inputTitle');
    const inputAuthor = document.getElementById('inputAuthor');
    const inputYear = document.getElementById('inputYear');
    const applyButton = document.getElementById('applyButton');
    const closeDialogButton = document.getElementById('closeDialogButton');

    openDialogButton.addEventListener('click', function() {
        myDialog.showModal();
    });

    closeDialogButton.addEventListener('click', function() {
        myDialog.close();
    });

    applyButton.addEventListener('click', async function () {
        const title = inputTitle.value;
        const author = inputAuthor.value;
        const year = inputYear.value;

        if (title && author && year) {
            // Создаем новую книгу
            const newBook = new Book(null, title, author, parseInt(year), null, true, null)

            let response = await fetch(
                'http://localhost:3000/library', // Адрес запроса
                {
                    method: 'POST', // Метод
                    headers: { // Заголовки
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(newBook) // Тело запроса
                }
            );


            // Закрываем диалоговое окно
            myDialog.close();


            window.location.reload();
        }
    });
});
