// TODO:
// fix xss vulnerability DONE
// make book.info return an array and change "read: true/false" to"Has been read/Not read yet" DONE
// add a button to change read status DONE
// make it work DONE
// style
    // change colors of book images to match

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
        let isReadText
        if (this.isRead === true) {
            isReadText = "Has been read"
        } else if (this.isRead === false) {
            isReadText = "Not read yet"
        } else {
            console.log("isreadtext does not match: " + isReadText)
        }
        return [
            this.title,
            this.author,
            this.pages,
            isReadText,
            this.id,
        ]
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead, crypto.randomUUID()));
}

function displayBooks() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.innerHTML = "";
    myLibrary.forEach(book => {
        //Book Card
        const bookCard = document.createElement("div");
        bookCard.setAttribute("class", "bookCard")
        bookCard.dataset.id = book.id;
        bookContainer.appendChild(bookCard);
        // Elements
        for (property of book.info()) {
            const bookPropertyP = document.createElement("p");
            bookPropertyP.style.class = "bookPropertyP";
            bookPropertyP.textContent = property;
            bookCard.appendChild(bookPropertyP);
        }
        // Toggle Read Button       
        const toggleReadBtn = document.createElement("img");
        if (book.isRead === true) {
            toggleReadBtn.setAttribute("src", "./Images/book-closed.png")
        } else if (book.isRead === false) {
            toggleReadBtn.setAttribute("src", "./Images/book-open.png")
        } else {
            console.log("isReadText not defined")
        }
        bookCard.insertBefore(toggleReadBtn, bookCard.children[4]);
        toggleReadBtn.addEventListener("click", (e) => {
            const index = myLibrary.findIndex((currVal) => currVal.id === e.target.parentNode.dataset.id);
            if (index > -1) { // only splice array when item is found
                if (myLibrary[index].isRead == true) {
                    myLibrary[index].isRead = false
                } else if (myLibrary[index].isRead == false) {
                    myLibrary[index].isRead = true
                } else {
                    console.log("Index.isread is neither true nor false: " + myLibrary[index].isRead)
                }
            }
            displayBooks()

        })
        //Remove Book Button
        const removeBookBtn = document.createElement("button");
        removeBookBtn.style.class = "removeBookBtn";
        removeBookBtn.textContent = "Remove Book";
        bookCard.appendChild(removeBookBtn);
        removeBookBtn.addEventListener("click", (e) => {
            const index = myLibrary.findIndex((currVal) => currVal.id === bookCard.dataset.id);
            if (index > -1) { // only splice array when item is found
                myLibrary.splice(index, 1); // 2nd parameter means remove one item only
            }
            e.target.parentNode.remove();
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
        addBookToLibrary(formData.get("book-name"), formData.get("author-name"), formData.get("pages"), formData.get("is-read") === "true");
        console.log("FORMDATA ISREAD: " + formData.get("is-read"))
        // formData.get(name attribute)
        form.reset();
        displayBooks();
    }
})

addBookToLibrary("The Hobbit", "J. R. R. Tolken", 295, false);
addBookToLibrary("My Book", "A DEV", 300, true);
displayBooks();
console.log(myLibrary)