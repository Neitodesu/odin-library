const addBookButton = document.querySelector('#addBookButton');
const authorName = document.querySelector('#author');
const bookTitle = document.querySelector('#title');
const bookPages = document.querySelector('#pages');
const hasReadInput = document.querySelector('#hasRead');
const openModalButton = document.querySelector('#addBookModal');
const modal = document.querySelector('#modal');
const closeModalButton = document.querySelector('#closeModal');
const libraryContainer = document.querySelector('.book-section');
const template = document.querySelector('#myTemplate');

let library = [];

class Book {
  constructor(author, title, pages, hasRead, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;
  }

  toggleRead() {
    this.hasRead = !this.hasRead;
  }
}

const createBook = (author, title, pages, hasRead) => {
  const bookId = crypto.randomUUID();
  let book = new Book(author, title, pages, hasRead, bookId);

  return book;
};

const updateLibrary = (author, title, pages, hasRead) => {
  let newBook = createBook(author, title, pages, hasRead);

  library.push(newBook);
  return newBook;
};

const validateForm = () => {
  if (!authorName.value) {
    return false;
  }
  if (!bookTitle.value) {
    return false;
  }
  if (!bookPages.value) {
    return false;
  }
  if (isNaN(bookPages.value)) {
    return false;
  }

  return true;
};

const resetForm = () => {
  authorName.value = '';
  bookTitle.value = '';
  bookPages.value = '';
};

const displayBooks = (book) => {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.book');

  card.querySelector('.book-title').textContent = book.title;
  card.querySelector('.book-author').textContent = book.author;
  card.querySelector('.book-pages').textContent = `${book.pages} pages`;
  card.querySelector('.has-read').textContent = book.hasRead ? 'Yes' : 'No';
  libraryContainer.appendChild(card);
  card.querySelector('.remove-book-btn').addEventListener('click', () => {
    library = library.filter((prop) => prop.id != book.id);
    card.remove();
  });

  card.querySelector('.toggle-read').addEventListener('click', () => {
    book.toggleRead();
    card.querySelector('.has-read').textContent = book.hasRead ? 'Yes' : 'No';
  });
};

addBookButton.addEventListener('click', (e) => {
  e.preventDefault();
  const checkRead = hasReadInput.checked;

  if (!validateForm()) {
    return;
  }

  const newBook = updateLibrary(
    authorName.value,
    bookTitle.value,
    bookPages.value,
    checkRead,
  );
  displayBooks(newBook);

  modal.close();

  resetForm();
});

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  resetForm();
  modal.close();
});
