let btn = document.querySelector('.btn');
let tBody = document.querySelector('.result');
let bTitle = document.querySelector('.book-title');
let bAuthor = document.querySelector('.book-author');
let bCode = document.querySelector('.book-code');
let alertDiv = document.querySelector('.alert-msg-contaner')
let obj = {}
let books = new Object({});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (bTitle.value.trim() && bAuthor.value.trim() && bCode.value.trim()) {
        newBookNumber = `book${Math.floor(Math.random() * 120)}}`
        obj[newBookNumber] = {
            bookTitle: bTitle.value,
            bookAuthor: bAuthor.value,
            bookCode: bCode.value
        }
        Object.assign(books, obj)
        localStorage.setItem("books", JSON.stringify(books)) // json.stringify new info
        alertMsg('add');
        checkBooksExest();
    } else {
        alertMsg('empty');
    }

})
function checkBooksExest() {
    if (localStorage.getItem('books')) {
        Object.assign(books, JSON.parse(localStorage.getItem('books'))) //convert object from string to real object
        showBooks();
    }
}
function showBooks() {
    tBody.innerHTML = ''
    for (let i in books) {
        tr = document.createElement('tr');
        tr.innerHTML = `
                          <td>${books[i].bookTitle}</td>
                          <td>${books[i].bookAuthor}</td>
                          <td>${books[i].bookCode}</td>
                          <td><button style='background-color:red;color:white;' onclick=removeBook('${i}')>X</button></td>
                  `;
        tBody.appendChild(tr);
    }
}
function alertMsg(msg)//add or remove or empty fildes
{
    let theMsg = document.createElement('div');
    theMsg.classList.add('alert-msg');
    theMsg.innerHTML = msg === 'add' ? 'Book Added!' : msg === 'remove' ? 'Book Removed!' : 'Someone Fildes Empty';
    alertDiv.append(theMsg);
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 3000)
}
function removeBook(booksName) {
    delete books[booksName]; // new info delete books from object
    localStorage.setItem("books", JSON.stringify(books))
    alertMsg('remove');
    showBooks();
}
checkBooksExest();