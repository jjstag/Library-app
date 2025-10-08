const myLibrary = []
const container = document.querySelector(".container")
const newBookBtn = document.getElementById('newBookBtn');
const newBookDialog = document.querySelector("dialog")

// CONSTRUCTING THE BOOK OBJECT
function Book(title, author, pages, isRead, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    this.info = function() {
        if (isRead === true) {
            return (`${this.title} by ${this.author}, ${this.pages} pages, has been read.`)
        } else if (isRead === false) {
            return (`${this.title} by ${this.author}, ${this.pages} pages, has not been read yet.`)
        } else {
            return (`${this.title} by ${this.author}, ${this.pages} pages.`)
        }
    };
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead, crypto.randomUUID))
}

// EXAMPLE BOOKS

function displayBooks() {
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.textContent = book.info()
        container.appendChild(bookCard);
    });
}

addBookToLibrary("TheHobbit", "J. R. R. Tolken", 295, false)
addBookToLibrary("My Book", "A DEV", 300, true)
displayBooks()

  newBookBtn.addEventListener('click', () => {
    newBookDialog.showModal();
    // const
  });
