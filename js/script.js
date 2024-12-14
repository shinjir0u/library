const booksNode = document.querySelector(".books");

const bookNameIcon = document.querySelector(".book-name-icon");
const authorIcon = document.querySelector(".author-icon");
const numberOfPagesIcon = document.querySelector(".number-of-pages-icon");
const readStatusIcon = document.querySelector(".read-status-icon");

const dialogBox = document.querySelector("dialog");
const addBookButton = document.querySelector(".add-book");

const dialogForm = document.querySelector("form");
const addButton = document.querySelector(".add-button");
const cancelButton = document.querySelector(".cancel-button");

const bookNameField = document.querySelector("#book-name");
const authorField = document.querySelector("#author");
const numberOfPagesField = document.querySelector("#number-of-pages");
const readStatusYesField = document.querySelector("#read-status-yes");
const readStatusNoField = document.querySelector("#read-status-no");
const fieldsToCheck = [bookNameField, authorField, numberOfPagesField];

let books = new Map();

let book1 = new Book(123, "Dummy", "Htoo", 150, true);
let book2 = new Book(234, "Chilling", "Thant", 1000, false);
let book3 = new Book(345, "Skill", "Scar", 100, false)

books.set(book1.isbn, book1);
books.set(book2.isbn, book2);
books.set(book3.isbn, book3);
displayBooks(books);
addBookButtonActions();

function Book(isbn, name, author, numberOfPages, readStatus) {
    this.isbn = isbn;
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
}

addBookButton.addEventListener("click", () => {
    dialogBox.showModal();
});

addButton.addEventListener("click", addButtonAction);
cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    resetFields(bookNameField, authorField, numberOfPagesField, readStatusYesField);

    dialogBox.close();
});

function addButtonAction(event) {
    event.preventDefault();
    if (!dialogForm.checkValidity()) {
        dialogForm.reportValidity();
        fieldsToCheck.forEach(checkElementValidity);
        addLiveValidatityCheck();
    }
    else {
        const isbnValue = generateIsbn();
        const bookNameValue = bookNameField.value;
        const authorValue = authorField.value;
        const numberOfPagesValue = numberOfPagesField.value;
        const readStatusYesValue = readStatusYesField.checked;
        const newBook = new Book(isbnValue, bookNameValue, authorValue, numberOfPagesValue, readStatusYesValue);
        books.set(isbnValue, newBook);
        resetFields(bookNameField, authorField, numberOfPagesField, readStatusYesField);
        readStatusYesField.checked = false;
        readStatusNoField.checked = false;
        refreshPage();
        dialogBox.close();   
    }
}

function addLiveValidatityCheck() {
    fieldsToCheck.forEach((element) => {
        element.addEventListener("input", addFieldValidityCheck);
    });
}

function addFieldValidityCheck(event) {
    if (event.target.checkValidity()) 
        event.target.classList.remove("invalid");
    else 
        event.target.classList.add("invalid");
}

function checkElementValidity(inputField) {
    if (!inputField.checkValidity())
        inputField.classList.add("invalid");
}

function resetFields(...fieldNodes) {
    fieldNodes.forEach(node => {
        node.value = "";
        node.classList.remove("invalid");
    });
}

function generateIsbn() {
    let isbn;
    do {
        isbn = +(Math.random()*1000 / (Math.random()*10)).toFixed(0);
    } while(books.has(isbn));
    return isbn;
}

function clearDisplayedBooks() {
    Array.from(booksNode.children).forEach(book => {
        booksNode.removeChild(book);
    });
}

function addBookButtonActions() {
    const removeButtons = document.querySelectorAll(".remove-button");
    const readButtons = document.querySelectorAll(".read-button");

    removeButtons.forEach(button => {
    button.addEventListener("click", removeBook);
    });

    readButtons.forEach(button => {
        button.addEventListener("click", changeReadStatus);
    });
}

function removeBook(event) {
    const book = event.target.parentNode.parentNode;
    const bookIsbn = book.firstChild.textContent;
    books.delete(+bookIsbn);

    refreshPage();
}

function changeReadStatus(event) {
    const book = event.target.parentNode.parentNode;
    const bookIsbn = book.firstChild.textContent;

    const bookInMap = books.get(+bookIsbn);
    bookInMap.readStatus = !bookInMap.readStatus;

    refreshPage();
}

function refreshPage() {
    clearDisplayedBooks();
    displayBooks(books);
    addBookButtonActions();
}

function displayBooks(books) {
    if (books.size === 0)
        return null;
    books.forEach(displayBook);
}

function displayBook(book) {
    const bookNode = generateBookNode();
    const hiddenIsbn = generateHiddenNode(book.isbn);
    const bookContentNode = generateBookContentNode(book);
    const bookButtonsNode = generateBookButtonsNode();

    bookNode.appendChild(hiddenIsbn);
    bookNode.appendChild(bookContentNode);
    bookNode.appendChild(bookButtonsNode);
    booksNode.appendChild(bookNode);
}  

function generateHiddenNode(hiddenText) {
    const hiddenNode = document.createElement("p");
    hiddenNode.textContent = hiddenText;
    hiddenNode.hidden = true;
    return hiddenNode;
}

function generateBookNode() {
    const bookNode = document.createElement("div");
    bookNode.classList.add("book");
    return bookNode;
}

function generateBookContentNode(book) {
    const bookContentNode = document.createElement("div");
    bookContentNode.classList.add("book-content");

    const bookNameNode = generateBookContentRow("book-name", book.name);
    const authorNode = generateBookContentRow("author", book.author);
    const numberOfPagesNode = generateBookContentRow("number-of-pages", book.numberOfPages);
    const readStatusNode = generateBookContentRow("read-status", (book.readStatus) ? "Read" : "Not Read");

    bookContentNode.appendChild(bookNameNode);
    bookContentNode.appendChild(authorNode);
    bookContentNode.appendChild(numberOfPagesNode);
    bookContentNode.appendChild(readStatusNode);
    return bookContentNode;
}

function generateBookContentRow(rowName, rowText) {
    const rowNode = document.createElement("div");
    rowNode.classList.add(`${rowName}-row`, "book-row");

    const rowSvg = getSvg(rowName);

    const rowTextNode = document.createElement("p");
    rowTextNode.classList.add(rowName);
    rowTextNode.textContent = rowText;

    rowNode.appendChild(rowSvg);
    rowNode.appendChild(rowTextNode);
    return rowNode;
}

function getSvg(rowName) {
    let svg;
    switch (rowName) {
        case "book-name": 
            svg = bookNameIcon.cloneNode(true);
            break;
        case "author":
            svg = authorIcon.cloneNode(true);
            break;
        case "number-of-pages":
            svg = numberOfPagesIcon.cloneNode(true);
            break;
        case "read-status":
            svg = readStatusIcon.cloneNode(true);
            break;
    }
    return svg;
}

function generateBookButtonsNode() {
    const bookButtonsNode = document.createElement("div");
    bookButtonsNode.classList.add("book-buttons");

    const removeButton = generateBookButton("remove");
    const readButton = generateBookButton("read");

    bookButtonsNode.appendChild(removeButton);
    bookButtonsNode.appendChild(readButton);
    return bookButtonsNode;
}

function generateBookButton(buttonName) {
    const bookButton = document.createElement("button");
    bookButton.type = "button";
    bookButton.classList.add(`${buttonName}-button`, "book-button");
    bookButton.textContent = capitalizeFirstLetter(buttonName);
    return bookButton;
}

function capitalizeFirstLetter(text) {
    return text.at(0).toUpperCase() + text.substring(1);
}
/*
Psuedocode

CREATE a constructor function(Book) with properties ISBN, name, author, numberOfPages, readStatus
CREATE a map(books) with book objects as values and respective ISBN as keys
CREATE a function(displayBooks) that displays the books from map


function displayBooks
    WHILE map has books 
        ADD the books with repective values to HTML
    END WHILE

function displayBook
    CREATE div with class book
        CREATE respective divs
*/