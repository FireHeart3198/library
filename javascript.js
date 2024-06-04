const myLibrary = [];
const body = document.querySelector("body");
const newBookButton = document.querySelector(".new-book");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const confirmButton = document.querySelector(".confirm");

//check if can/should make the above an id

class Book {
  constructor(title, author, pages, read, area) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.area = area;
  }

  get info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }

  readBook() {
    if (this.read === "read") {
      this.read = "not yet read";
    } else {
      this.read = "read";
    }
    displayLibrary();
  }
}

function addBookToLibrary(title, author, pages, read, area) {
  const book = new Book(title, author, pages, read, area);
  myLibrary.push(book);
}

function displayLibrary() {
  const libraryContainer = document.querySelector(".library-container");
  libraryContainer.remove();

  const newLibraryContainer = document.createElement("div");
  newLibraryContainer.classList.add(`library-container`);
  body.append(newLibraryContainer);

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    for (info in book) {
      if (typeof book[info] !== "function") {
        const div = document.createElement("div");
        const className = info;
        div.classList.add(`${className}`);
        if (info === "pages") {
          div.textContent = `${book[info]} pages`;
        } else {
          div.textContent = book[info];
        }
        bookCard.append(div);
      }
    }
    bookCard.setAttribute("data-book-number", `${index}`);

    const removeButton = document.createElement("button");
    removeButton.classList.add("book-remove");
    removeButton.setAttribute("data-close-number", `${index}`);
    removeButton.addEventListener("click", (e) => removeBook(e.target));
    bookCard.append(removeButton);

    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.setAttribute("data-read-number", `${index}`);
    readButton.addEventListener("click", (e) => toggleRead(e.target));
    bookCard.append(readButton);

    newLibraryContainer.append(bookCard);
  });
}

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

confirmButton.addEventListener("click", (e) => {
  if (form.checkValidity()) {
    e.preventDefault();
    new FormData(form);
    dialog.close();
    form.reset();
  } else {
    form.reportValidity();
  }
});

form.addEventListener("formdata", (e) => {
  const data = e.formData;
  const newBookInfo = [];
  for (let value of data.values()) {
    newBookInfo.push(value);
  }
  addBookToLibrary(...newBookInfo);
  displayLibrary();
});

function removeBook(target) {
  bookNumber = target.getAttribute("data-close-number");

  const bookToDelete = document.querySelector(
    `[data-book-number="${bookNumber}"`
  );
  bookToDelete.remove();

  myLibrary.splice(bookNumber, 1);
  displayLibrary();
}

function toggleRead(target) {
  bookNumber = target.getAttribute("data-read-number");
  myLibrary[bookNumber].readBook();
  // might want to return read/not yet read and reset text.content of button
}

// books to check display
addBookToLibrary("Cotillion", "Georgette Heyer", "416", "not yet read", "");
addBookToLibrary(
  "Princess Ben",
  "Catherine Gilbert Murdock",
  "344",
  "read",
  ""
);
addBookToLibrary("Swift", "R.J. Anderson", "356", "not yet read", "");
addBookToLibrary("Cinder", "Marissa Meyer", "400", "not yet read", "");
addBookToLibrary("Six of Crows", "Leigh Bardugo", "465", "read", "");
console.log(myLibrary);
displayLibrary();
