const formModal = document.querySelector(".form-modal");
const openForm = document.querySelector(".open-form");
const addBook = document.querySelector(".add-book");
const libraryList = document.querySelector(".library-items");

const myLibrary = [];

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = Boolean(hasRead);
    }
}

openForm.addEventListener("click", () => {
    formModal.showModal();
});

addBook.addEventListener("click", (e) => {
    const bookTitle = document.querySelector(".book-title");
    const bookAuthor = document.querySelector(".book-author");
    const totalPages = document.querySelector(".total-pages");
    const hasRead = document.querySelector(".has-read");

    const newBook = new Book(bookTitle.value, bookAuthor.value, totalPages.value, hasRead.checked);

    addBookToLibrary(newBook);

    bookTitle.value = "";
    bookAuthor.value = "";
    totalPages.value = "";
    hasRead.checked = false;

    e.preventDefault();
    formModal.close();
});

function addBookToLibrary(book) {
    myLibrary.push(book);
    refreshLibrary();
}

function refreshLibrary() {

    //clear library div
    
    while(libraryList.firstChild) {
        libraryList.removeChild(libraryList.firstChild);
    }

    //loop through myLibrary contents

    if(myLibrary.length < 1) {
        const emptyMessage = document.createElement("pre");
        emptyMessage.textContent = `----------   Nothing to display   ----------`;
        emptyMessage.classList.add("empty-message");
        libraryList.appendChild(emptyMessage);
    } else {
        for(let i = 0; i < myLibrary.length; i++) {
            const newItem = createCard(myLibrary[i]);
            libraryList.appendChild(newItem);
        }
    }

    
}

function createCard(libraryItem) {
    const newCard = document.createElement("li");
    newCard.classList.add("library-item");

    const title = document.createElement("p");
    title.classList.add("title");
    const author = document.createElement("p");
    const pages = document.createElement("p");

    const toggleRead = document.createElement("button");
    if(libraryItem.hasRead) {
        toggleRead.classList.add("read");
        toggleRead.textContent = "Read";
    }
    else {
        toggleRead.textContent = "Not Read";
    }

    toggleRead.addEventListener("click", () => {
        toggleRead.classList.toggle("read");
        toggleRead.textContent === "Read" ? toggleRead.textContent = "Not Read"
            : toggleRead.textContent = "Read";
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", (e) => {
        myLibrary.splice(myLibrary.indexOf(libraryItem), 1);
        
        refreshLibrary();
    });

    title.textContent = libraryItem.title;
    author.textContent = libraryItem.author;
    pages.textContent = libraryItem.pages + " pages";

    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(pages);
    newCard.appendChild(toggleRead);
    newCard.appendChild(removeButton);

    return newCard;
}

//show on start
refreshLibrary();