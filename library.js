// import path from "path";
// import fs from 'fs/promises';
//
// const savePath = path.join(__dirname, 'data', 'library.pug.json');
//
//
// export class Library{
//     constructor() {
//     this.books = []
//     }
//     async loadBooksFromJSON() {
//         const filePath = path.join(__dirname, 'data', 'books.json');
//         try {
//             const data = await fs.readFile(filePath, 'utf-8');
//             return JSON.parse(data);
//         } catch (error) {
//             console.error('Ошибка чтения файла: ' + error);
//             return [];
//         }
//     }
//
//     async saveBooksToJSON() {
//         try {
//             await fs.writeFile(savePath, JSON.stringify(this.books, null, 2), 'utf-8');
//         } catch (error) {
//             console.error('Ошибка записи файла: ' + error);
//         }
//     }
//
//     addBook(book) {
//         // Генерируем уникальный идентификатор для книги
//         const id = this.books.length > 0 ? this.books[this.books.length - 1].id + 1 : 1;
//         book.id = id;
//         this.books.push(book);
//         this.saveBooksToJSON();
//     }
//
//     deleteBook(bookId) {
//         const index = this.books.findIndex(book => book.id === bookId);
//         if (index !== -1) {
//             this.books.splice(index, 1);
//             this.saveBooksToJSON();
//         }
//     }
//
//     editBook(bookId, newData) {
//         const index = this.books.findIndex(book => book.id === bookId);
//         if (index !== -1) {
//             this.books[index] = { ...this.books[index], ...newData };
//             this.saveBooksToJSON();
//         }
//     }
//
//     getBookById(bookId) {
//         return this.books.find(book => book.id === bookId);
//     }
//
//     filterBooksByAvailability(available) {
//         return this.books.filter(book => book.available === available);
//     }
//
//     filterBooksByDueDate(dueDate) {
//         return this.books.filter(book => book.dueDate === dueDate);
//     }
// }