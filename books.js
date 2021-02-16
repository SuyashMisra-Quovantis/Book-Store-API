const fs = require("fs");
const chalk = require("chalk");

//ADD BOOK
const addBook = (bookObject) => {
  const books = loadBooks();

  const duplicate = books.find((book) => {
    return book.id === bookObject.id;
  });

  if (!duplicate) {
    books.push(bookObject);

    saveBook(books);
    console.log(chalk.bgGreen("New book added!"));
    return true;
  } else {
    console.log(chalk.bgRed("Book already exists!"));
    return false;
  }
};

//DELETE BOOK
const deleteBook = (bookId) => {
  const books = loadBooks();

  const newBookArray = books.filter((book) => {
    return book.id != bookId;
  });

  if (newBookArray.length !== books.length) {
    saveBook(newBookArray);
    console.log(chalk.bgGreen("Book removed!"));
    return true;
  } else {
    console.log(chalk.bgRed("No book found!"));
    return false;
  }
};

//save book to json file
const saveBook = (books) => {
  const data = JSON.stringify(books);
  fs.writeFileSync("./booksInfo.json", data);
};

//read book from json file
const loadBooks = () => {
  //returns an array of books
  try {
    const dataBuffer = fs.readFileSync("booksInfo.json");
    const stringData = dataBuffer.toString();
    const jsonData = JSON.parse(stringData);
    return jsonData;
  } catch (e) {
    return [];
  }
};

//READ LIST OF BOOKS
const listBooks = () => {
  const books = loadBooks();
  console.log(chalk.blue("Your Books: "));
  books.forEach((book) => {
    console.log(book);
  });
};

//READ SINGLE BOOK
const listBookById = (book_id) => {
  // console.log(book_id);
  const books = loadBooks();
  // console.log(books);
  let bookPresent = null;

  const book = books.forEach((bookElement) => {
    if (bookElement.id == book_id) {
      bookPresent = bookElement;
    }
  });

  if (bookPresent) {
    console.log(bookPresent);
    return bookPresent;
  }

  console.log("Book not found!");
  return "Book not found!";
};

//UPDATE BOOK
const updateBook = (bookObject) => {
  const books = loadBooks();
  const newBookArray = books.filter((bookElement) => {
    //this omits the old book in the filtered array
    return bookElement.id !== bookObject.id;
  });

  if (newBookArray.length === books.length) {
    console.log("Book to be updated does not exist");
    return false;
  } else {
    //this adds the updated book to the array
    newBookArray.push(bookObject);
    saveBook(newBookArray);
    console.log("Book updated!");
    return true;
  }
};

module.exports = {
  addBook: addBook,
  deleteBook: deleteBook,
  loadBooks: loadBooks,
  listBooks: listBooks,
  updateBook: updateBook,
  listBookById: listBookById,
};
