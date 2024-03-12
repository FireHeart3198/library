const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

function addBookToLibrary() {
    let title = prompt("Book Title", 'Cotillion')
    let author = prompt("Book Author", 'Georgette Heyer')
    let pages = prompt("Total number of pages?", '416')
    let read = prompt("Read?", 'not yet read')
    
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

addBookToLibrary();
console.log(myLibrary)
