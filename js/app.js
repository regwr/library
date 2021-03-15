const bookStatus = {
    READING: "READING",
    COMPLETED: "COMPLETED",
    DROPPED: "DROPPED",
    PLANTOREAD: "PLAN TO READ"
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

const bookForm = document.getElementById("bookForm");
const bookTable = document.getElementById("bookTable");
const local_library = JSON.parse(localStorage.getItem("library")) || null;
const library = [];

if (local_library) library.push(...local_library);

const addBook = newBook => {
    if (!(newBook instanceof Book)) return;

    library.push(newBook);
    localStorage.setItem("library", JSON.stringify(library));
};

// const removeBook = book => 
//     const index = library.indexOf(book);
//     if (index !== -1) {
//         library.splice(index, 1);
//         localStorage.setItem("library", JSON.stringify(library));
//     }
// }

const removeBookByName = bookName => {
    for (book of library) {
        if(book.title == bookName) {
            library.splice(library.indexOf(book), 1);
            localStorage.setItem("library", JSON.stringify(library));
        }
    }
}

const showBooks = () => { 
    const tbody = bookTable.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    library.forEach( book => {
        const row = tbody.insertRow();
        const removeButton = document.createElement("button");
        const select = document.createElement("select");

        for (status in bookStatus) {
            let _status = bookStatus[status];
            const option = document.createElement("option");
            option.value = _status;
            option.innerHTML = _status;

            select.appendChild(option);

            if (option.value == book.status) {
                select.value = option.value;
            }
        }

        select.onchange = () => {
            book.status = select.value;
            localStorage.setItem("library", JSON.stringify(library));
        }


        removeButton.innerHTML = "REMOVE";
        removeButton.onclick = () => {
            tbody.deleteRow(row.index);
            removeBookByName(book.title);
        }

        row.insertCell().innerHTML = book.title;
        row.insertCell().innerHTML = book.author;
        row.insertCell().innerHTML = book.pages;
        row.insertCell().appendChild(select);
        row.insertCell().appendChild(removeButton);
    });
}

bookForm.addEventListener("submit", event => {
    const form = event.target.elements;
    
    const book = new Book(form.bookTitle.value, form.bookAuthor.value, form.bookPages.value, form.bookStatus.value);
    addBook(book);
});
