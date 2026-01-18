let library = [];

const addBookButton = document.querySelector('#addBookButton');
const authorName = document.querySelector('#author');
const bookTitle = document.querySelector('#title');
const bookPages = document.querySelector('#pages');
const hasReadInput = document.querySelector('#hasRead');
const openModalButton = document.querySelector('#addBookModal');
const modal = document.querySelector('#modal');
const closeModalButton = document.querySelector('#closeModal');

let isValid = false;

class Book {
  constructor(author, title, pages, hasRead, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;
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
};

const resetForm = () => {
  authorName.value = '';
  bookTitle.value = '';
  bookPages.value = '';
  isValid = false;
};

const validateForm = () => {
  if (authorName.value == '') {
    return;
  }
  if (bookTitle.value == '') {
    return;
  }
  if (bookPages.value == '') {
    return;
  }
  if (bookPages.value != +bookPages.value) {
    return;
  }

  isValid = true;
};
addBookButton.addEventListener('click', (e) => {
  e.preventDefault();
  const checkRead = true ? hasReadInput.checked : false;

  validateForm();
  if (!isValid) {
    return;
  }
  updateLibrary(authorName.value, bookTitle.value, +bookPages.value, checkRead);
  modal.close();
  resetForm();
  console.log(library);
});

openModalButton.addEventListener('click', () => {
  modal.showModal();
});

closeModalButton.addEventListener('click', () => {
  modal.close();
});
