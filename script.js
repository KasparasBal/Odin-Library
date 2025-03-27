const main = document.querySelector(".main");
const btnAdd = document.querySelector(".btn-add");
const btnClose = document.querySelector(".btn-close");
const btnSubmit = document.querySelector(".btn-submit");
const overlay = document.querySelector(".overlay");
const formContainer = document.querySelector(".form-container");
const bookTable = document.getElementById("book-table");
const tableBody = document.getElementById("table-body");
const formInputs = document.querySelectorAll(".input");
const titleInput = document.getElementById("title");
const yearInput = document.getElementById("year");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

const myLibrary = [];

function Book(title, year, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.year = year;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, year, author, pages, read) {
  myLibrary.push(new Book(title, year, author, pages, read));
  console.log(myLibrary);
}

function addBooksToCanvas(bookInput) {
  if (Array.isArray(bookInput)) {
    bookInput.forEach((book) => {
      const tableRow = document.createElement("tr");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const yearCell = document.createElement("td");
      const pagesCell = document.createElement("td");
      const trashCell = document.createElement("td");
      const readCell = document.createElement("td");
      const tableBtnDelete = document.createElement("button");
      const tableBtnDeleteImage = document.createElement("img");
      const tableBtnRead = document.createElement("input");

      tableRow.setAttribute("data-id", book.id);

      tableBtnRead.type = "checkbox";
      tableBtnDeleteImage.src = "./images/trash.svg";

      tableRow.classList.add("table-row");
      tableBtnDelete.classList.add("btn");
      tableBtnDelete.classList.add("btn-trash");
      tableBtnRead.classList.add("checkbox");

      tableBtnDelete.appendChild(tableBtnDeleteImage);
      tableBtnRead.textContent = "Read?";

      trashCell.appendChild(tableBtnDelete);
      readCell.appendChild(tableBtnRead);

      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      yearCell.textContent = book.year;
      pagesCell.textContent = book.pages;

      if (book.read) {
        tableBtnRead.checked = true;
      } else {
        tableBtnRead.checked = false;
      }

      tableRow.appendChild(titleCell);
      tableRow.appendChild(authorCell);
      tableRow.appendChild(yearCell);
      tableRow.appendChild(pagesCell);
      tableRow.appendChild(readCell);
      tableRow.appendChild(trashCell);

      tableBody.appendChild(tableRow);
    });
  } else {
    const tableRow = document.createElement("tr");
    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const yearCell = document.createElement("td");
    const pagesCell = document.createElement("td");
    const trashCell = document.createElement("td");
    const readCell = document.createElement("td");
    const tableBtnDelete = document.createElement("button");
    const tableBtnDeleteImage = document.createElement("img");
    const tableBtnRead = document.createElement("input");

    tableRow.setAttribute("data-id", book.id);

    tableBtnRead.type = "checkbox";
    tableBtnDeleteImage.src = "./images/trash.svg";

    tableRow.classList.add("table-row");
    tableBtnDelete.classList.add("btn");
    tableBtnDelete.classList.add("btn-trash");
    tableBtnRead.classList.add("checkbox");

    tableBtnDelete.appendChild(tableBtnDeleteImage);
    tableBtnRead.textContent = "Read?";

    trashCell.appendChild(tableBtnDelete);
    readCell.appendChild(tableBtnRead);

    titleCell.textContent = bookInput.title;
    authorCell.textContent = bookInput.author;
    yearCell.textContent = bookInput.year;
    pagesCell.textContent = bookInput.pages;

    if (bookInput.read) {
      tableBtnRead.checked = true;
    } else {
      tableBtnRead.checked = false;
    }

    tableRow.appendChild(titleCell);
    tableRow.appendChild(authorCell);
    tableRow.appendChild(yearCell);
    tableRow.appendChild(pagesCell);
    tableRow.appendChild(readCell);
    tableRow.appendChild(trashCell);

    tableBody.appendChild(tableRow);
  }
}

addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  1997,
  "J.K. Rowling",
  432,
  true
);
addBookToLibrary("The Lord of the Rings", 1954, "J.R.R. Tolkien", 342, true);
addBookToLibrary("Pride and Prejudice", 1813, "Jane Austen", 542, false);
addBookToLibrary("Dune", 1965, "Frank Herbert", 232, true);

addBooksToCanvas(myLibrary);

// Removing & Editing the Books

bookTable.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.contains("checkbox")) {
  }
  if (e.target.classList.contains("btn-trash")) {
  }
});

//

const closingElements = [btnAdd, overlay, btnClose];

closingElements.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      formContainer.classList.contains("display-none") &&
      overlay.classList.contains("display-none")
    ) {
      formContainer.classList.remove("display-none");
      overlay.classList.remove("display-none");
    } else {
      formContainer.classList.add("display-none");
      overlay.classList.add("display-none");
    }
  })
);

formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    input.dataset.touched = "true";
  });
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    yearInput.value &&
    authorInput.value &&
    yearInput.value &&
    pagesInput.value
  ) {
    addBookToLibrary(
      titleInput.value,
      yearInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.value
    );
    addBooksToCanvas(myLibrary[myLibrary.length - 1]);
    formContainer.classList.add("display-none");
    overlay.classList.add("display-none");
  }
});

if (myLibrary.length === 0) {
  bookTable.style.display = "none";
  const noContentWarning = document.createElement("p");
  noContentWarning.textContent =
    "No Books found in your library. Try adding some.";
  main.appendChild(noContentWarning);
}
