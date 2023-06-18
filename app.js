let form = document.getElementById("book-form")
let tbody = document.getElementById("book-list")


//NOW AFTER 47 CREATE FUNCTION HERE
function showAlert(msg, className) {
    const div = document.createElement("div")   //<div></div>
    div.className = "alert alert-" + className   // <div class="alert alert-danger"></div>
    div.appendChild(document.createTextNode(msg))   //<div class="alert alert-danger">Please Fill All The Fields</div>
    const container = document.querySelector(".container")
    const form = document.querySelector("#book-form")
    container.insertBefore(div, form)
    setTimeout(function () {
        document.querySelector(".alert").remove()

    }, 2000)
}



//UI
function getBook() {
    const storedBooks = getBookFromDb()


    storedBooks.forEach(function (book) {
        // console.log("book",book.title)
        addBookToList(book.title, book.author, book.isbn)

    })
}



function addBookToList(title, author, isbn) {
    let tr = document.createElement("tr")   //<tr></tr>    tag created
    tr.innerHTML = `
    <td>${title}</td>
    <td>${author}</td>
    <td>${isbn}</td>
    <td><a href="#" class="btn btn-danger float right delete">x</a></td>
     `
    tbody.appendChild(tr)
}



function clearAllFields() {
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("isbn").value = ""
    document.getElementById("title").focus()
}

//Local Storage(Db database)
function addBookToDb(title, author, isbn) {
    let books =getBookFromDb()        //ERROR
    books.push({ title, author, isbn })
    localStorage.setItem("books", JSON.stringify(books))        //json.stringfy is used to convertt array or object into string.

}


function getBookFromDb() {
    let books;
    if (localStorage.getItem("books") == null) {
        books = []     //blank array
    }
    else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    return books
}

function removeBook(isbn) {
    const storedBooks = getBookFromDb()
    // console.log(storedBooks)
    storedBooks.forEach(function (book, idx) {
        if (book.isbn == isbn) {
            storedBooks.splice(idx, 1)
        }

    })
    localStorage.setItem("books",JSON.stringify(storedBooks))
}






//Event Listener
form.addEventListener("submit", function (x) {
    x.preventDefault()
    // console.log("hi")
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let isbn = document.getElementById("isbn").value

    if (title == "" || author == "" || isbn == "") {
        // alert("Please Fill All The Fields");
        showAlert("Please Fill All The Fields", "danger")
        return;
    }
    addBookToList(title, author, isbn)
    addBookToDb(title, author, isbn)
    clearAllFields()


    showAlert("Book Added Successfully", "success")


})



tbody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete")) {
            removeBook(e.target.parentElement.previousElementSibling.textContent)
            tbody.removeChild(e.target.parentElement.parentElement)
        }
    }
})

window.addEventListener("load", getBook)