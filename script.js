const main = document.querySelector(".main");
const bookTable = document.getElementById("book-table");
const tableBody = document.getElementById("table-body");

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

function addBooksToCanvas(bookArray) {
  bookArray.forEach((book) => {
    const tableRow = document.createElement("tr");
    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const yearCell = document.createElement("td");

    tableRow.classList.add("table-row");

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    yearCell.textContent = book.year;

    tableRow.appendChild(titleCell);
    tableRow.appendChild(authorCell);
    tableRow.appendChild(yearCell);

    tableBody.appendChild(tableRow);
  });
}

addBookToLibrary("Harry Potter and the Sorcerer's Stone", 1997, "J.K. Rowling");
addBookToLibrary("The Lord of the Rings", 1954, "J.R.R. Tolkien");
addBookToLibrary("Pride and Prejudice", 1813, "Jane Austen");
addBookToLibrary("Dune", 1965, "Frank Herbert");

addBooksToCanvas(myLibrary);

if (myLibrary.length === 0) {
  bookTable.style.display = "none";
  const noContentWarning = document.createElement("p");
  noContentWarning.textContent =
    "No Books found in your library. Try adding some.";
  main.appendChild(noContentWarning);
}
