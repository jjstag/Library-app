// TODO:
// fix xss vulnerability DONE
// make book.info return an array and change "read: true/false" to"Has been read/Not read yet"
// add a button to change read status
// style

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
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = isRead;
    this.ID = id;
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead, crypto.randomUUID()));
}

function displayBooks() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.dataset.id = book.ID
        bookContainer.appendChild(bookCard);
        for (property in book) {
            const bookPropertyP = document.createElement("p")
            bookPropertyP.style.class = "bookPropertyP"
            bookPropertyP.textContent = property + ": " + book[property]
            bookCard.appendChild(bookPropertyP)
        }
        const removeBookBtn = document.createElement("button")
        removeBookBtn.style.class = "removeBookBtn"
        removeBookBtn.textContent = "Remove Book"
        bookCard.appendChild(removeBookBtn)
        removeBookBtn.addEventListener("click", (e) => {
            e.target.parentNode.remove()
        });
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