const booksNode = document.querySelector(".books");

const bookNameIcon = document.querySelector(".book-name-icon");
const authorIcon = document.querySelector(".author-icon");
const numberOfPagesIcon = document.querySelector(".number-of-pages-icon");
const readStatusIcon = document.querySelector(".read-status-icon");

let books = new Map();

let book1 = new Book(123, "Dummy", "Htoo", 150, "Read");
let book2 = new Book(234, "Chilling", "Thant", 1000, "Not Read");
let book3 = new Book(345, "Skill", "Scar", 100, "Not Read")

books.set(book1.isbn, book1);
books.set(book2.isbn, book2);
books.set(book3.isbn, book3);
displayBooks(books);

function Book(isbn, name, author, numberOfPages, readStatus) {
    this.isbn = isbn;
    this.name = name;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
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
    const readStatusNode = generateBookContentRow("read-status", book.readStatus);

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