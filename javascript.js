const myLibrary = [];
const body = document.querySelector('body')

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

function displayLibrary() {
    myLibrary.forEach(book => {
       const bookCard = document.createElement('div');
       bookCard.classList.add('book-card');
       for(info in book) {
        if(typeof book[info] !== "function") {
            const div = document.createElement('div')
            const className = info;
            div.classList.add(`${className}`)
            div.textContent = book[info]
            bookCard.append(div)
        }
       }
       body.append(bookCard);
    })
}

// books to check display
addBookToLibrary('Cotillion', 'Georgette Heyer', '416', 'not yet read');
addBookToLibrary('Princess Ben', 'Catherine Gilbert Murdock', '344', 'read');
addBookToLibrary('Swift', 'R.J. Anderson', '356', 'not yet read');
addBookToLibrary('Cinder', 'Marissa Meyer', '400', 'not yet read');
addBookToLibrary('Six of Crows', 'Leigh Bardugo', '465', 'read');
console.log(myLibrary);
displayLibrary();