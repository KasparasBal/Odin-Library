const myLibrary = [];

function Book(title, year, author) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.year = year;
  this.author = author;
}

function addBookToLibrary(title, year, author) {
  // take params, create a book then store it in the array
  myLibrary.push(new Book(title, year, author));
  console.log(myLibrary);
}

addBookToLibrary("Harry Potter and the Sorcerer's Stone", 1997, "J.K. Rowling");
addBookToLibrary("The Lord of the Rings", 1954, "J.R.R. Tolkien");
addBookToLibrary("Pride and Prejudice", 1813, "Jane Austen");
addBookToLibrary("Dune", 1965, "Frank Herbert");
