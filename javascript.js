const myLibrary = [];
const body = document.querySelector('body')
const newBookButton = document.querySelector('.new-book')
const dialog = document.querySelector('dialog')
const form = document.querySelector('form')
const confirmButton = document.querySelector('.confirm') 

//check if can/should make the above an id

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
    console.log(title)
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

function displayLibrary() {
    const libraryContainer = document.querySelector('.library-container')
    libraryContainer.remove();

    const newLibraryContainer = document.createElement('div');
    newLibraryContainer.classList.add(`library-container`);
    body.append(newLibraryContainer)
    
    myLibrary.forEach(book => {
       const bookCard = document.createElement('div');
       bookCard.classList.add('book-card');
       for(info in book) {
        if(typeof book[info] !== "function") {
            const div = document.createElement('div')
            const className = info;
            div.classList.add(`${className}`)
            if (info === "pages") {
                div.textContent = `${book[info]} pages`
            } else {
                div.textContent = book[info]
            }
            bookCard.append(div)
        }
       }
       newLibraryContainer.append(bookCard);
    })
}

function createNewLibrary() {
    
}

newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

confirmButton.addEventListener("click", e => {
    e.preventDefault();
    new FormData(form)
    dialog.close();
    form.reset();
})

form.addEventListener("formdata", e => {
    const data = e.formData;
    const newBookInfo = [];
    console.log(data.values());
    for(let value of data.values()) {
        newBookInfo.push(value)
    }

    addBookToLibrary(...newBookInfo);
    displayLibrary();
})


// books to check display
addBookToLibrary('Cotillion', 'Georgette Heyer', '416', 'not yet read');
addBookToLibrary('Princess Ben', 'Catherine Gilbert Murdock', '344', 'read');
addBookToLibrary('Swift', 'R.J. Anderson', '356', 'not yet read');
addBookToLibrary('Cinder', 'Marissa Meyer', '400', 'not yet read');
addBookToLibrary('Six of Crows', 'Leigh Bardugo', '465', 'read');
console.log(myLibrary);
displayLibrary();