const fs = require('fs');

function readData() {
    try {
        const jsonData = fs.readFileSync('./data/library.json', 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Ошибка при чтении файла library.json: ${error.message}`);
        return null;
    }
}

function saveData(books) {
    fs.writeFile('./data/library.json', JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error('Ошибка при сохранении файла:', err);
        } else {
            console.log('Данные успешно сохранены в файл');
        }
    })
}


module.exports = {readData, saveData};