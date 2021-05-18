const bookContainer = document.getElementById('book-container');
const addBookForm = document.getElementById('add-book');

let myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function createLibrary() {
    myLibrary.forEach((book) => {

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-card');
        bookInfo.id = book.id;

        const bookTitle = document.createElement('h2');
        const bookAuthor = document.createElement('h2');
        const bookPages = document.createElement('h2');

        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookPages.textContent = `Pages: ${book.pages}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'DELETE';
        deleteButton.addEventListener('click', () => {
            deleteBook(book.id);
        });

        const toggleRead = document.createElement('button');
        toggleRead.textContent = book.read ? 'UNREAD' : 'READ';
        toggleRead.addEventListener('click', () => {
            toggleReadBook(book.id);
        });

        console.log('xD');

        [bookTitle, bookAuthor, bookPages, deleteButton, toggleRead].forEach(prop => {
            bookInfo.appendChild(prop);
        })

        bookContainer.appendChild(bookInfo);
    })
}

function createAddButton() {
    addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add-book-card');

    bookContainer.appendChild(addButton);
    document.querySelector('.add-book-card').addEventListener('click', togglePopup);
}

createAddButton();
createLibrary();

const addBookPopup = document.getElementById('new-book');

function togglePopup() {
    document.querySelector('#book-container').classList.toggle('blurred-bg');
    addBookPopup.classList.toggle('visible');
    addBookPopup.parentElement.classList.toggle('visible');
}

document.getElementById('cancel-popup').addEventListener('click', togglePopup);

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    newTitle = document.getElementById('title').value;
    newAuthor = document.getElementById('author').value;
    newPages = document.getElementById('pages').value;

    addBookToLibrary(newTitle, newAuthor, newPages);
    togglePopup();

    e.target.reset();

})

function addBookToLibrary(newTitle, newAuthor, newPages) {
    if (myLibrary.some(v => v.title === newTitle)) return false;
    myLibrary.push(new Book(generateId(), newTitle, newAuthor, newPages, false))
    console.log(myLibrary);
    resetLibrary();
    createAddButton();
    createLibrary();
}


function deleteBook(bookId) {

    myLibrary = [...myLibrary].filter(v => v.id != bookId);

    const bookElToDelete = document.getElementById(`${bookId}`);
    bookElToDelete.remove();
}

function toggleReadBook(bookId) {
    toggledEl = [...myLibrary].filter(v => v.id === bookId);
    toggledEl[0].read = toggledEl[0].read ? false : true;
    console.log(toggledEl[0]);
    resetLibrary();
    createAddButton();
    createLibrary();
}

function resetLibrary() {
    document.getElementById('book-container').innerHTML = '';
}

function generateId() {
    return Math.floor(Math.random() * 10000);
}