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

const checkLibLength = () => {
  if (myLibrary.length === 0) {
    const noContentWarning = document.createElement("p");
    noContentWarning.classList.add("contentWarning");
    bookTable.style.display = "none";
    noContentWarning.textContent =
      "No Books found in your library. Try adding some.";
    main.appendChild(noContentWarning);
  } else {
    bookTable.style.display = "table";
    updateCanvas();
    const contentWarning = main.querySelector(".contentWarning");
    if (contentWarning) {
      contentWarning.remove();
    }
  }
};

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

    tableRow.setAttribute("data-id", bookInput.id);

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

const updateCanvas = () => {
  tableBody.innerHTML = "";
  addBooksToCanvas(myLibrary);
};

//Find book & edit it

bookTable.addEventListener("change", (e) => {
  if (e.target.classList.contains("checkbox")) {
    const bookToEdit = myLibrary.findIndex((book) => {
      return book.id === closestDataId.dataset.id;
    });

    if (bookToEdit !== -1) {
      myLibrary[bookToEdit].read = e.target.checked;
      checkLibLength();
    }
  }
});

//Find book & delete it

bookTable.addEventListener("click", (e) => {
  closestDataId = e.target.closest(`[data-id]`);

  if (
    (e.target.parentElement &&
      e.target.parentElement.tagName.toLowerCase() === "button" &&
      e.target.parentElement.classList.contains("btn-trash")) ||
    e.target.classList.contains("btn-trash")
  ) {
    const bookToRemove = myLibrary.findIndex((book) => {
      return book.id === closestDataId.dataset.id;
    });

    if (bookToRemove !== -1) {
      myLibrary.splice(bookToRemove, 1);
      checkLibLength();
    }
  }
});

const closingElements = [btnAdd, overlay, btnClose];

//Closing logic for modal

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

const clearForm = () => {
  formInputs.forEach((input) => {
    input.value = "";
    input.textContent = "";
    input.checked = false;
    input.dataset.touched = "false";
  });
};

//Prevent valid & unvalid style to show before user interacts
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
      readInput.checked
    );
    checkLibLength();
    clearForm();
    formContainer.classList.add("display-none");
    overlay.classList.add("display-none");
  }
});

checkLibLength();
