const myLibrary = [];
const container = document.querySelector(".container");
const newBookBtn = document.querySelector('#newBookBtn');
const newBookDialog = document.querySelector("dialog");
const submitBtn = document.querySelector("button[type='submit']");
const form = document.querySelector("#newBookForm");


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
            return (`${this.title} by ${this.author}, ${this.pages} pages, has been read. ID: <span style="color: gray; font-family: monospace">${this.id}</span>`);
        } else if (isRead === false) {
            return (`${this.title} by ${this.author}, ${this.pages} pages, has not been read yet. ID: <span style="color: gray; font-family: monospace">${this.id}</span>`);
        } else {
            return (`${this.title} by ${this.author}, ${this.pages} pages. ID: <span style="color: gray; font-family: monospace">${this.id}</span>`);
        }
    };
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead, crypto.randomUUID()));
}

function displayBooks() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.innerHTML = book.info();
        bookContainer.appendChild(bookCard);
    });
}

newBookBtn.addEventListener('click', () => {
    newBookDialog.show();
});

form.addEventListener("click", (e) => {
    if (e.target.type == "submit") {
        e.preventDefault();
        newBookDialog.close();
        let formData = new FormData(e.currentTarget)
        addBookToLibrary(formData.get("book-name"), formData.get("author-name"), formData.get("pages"), formData.get("is-read"));
        // formData.get(name attribute)
        form.reset();
        displayBooks();
    }
})

addBookToLibrary("The Hobbit", "J. R. R. Tolken", 295, false);
addBookToLibrary("My Book", "A DEV", 300, true);
displayBooks();