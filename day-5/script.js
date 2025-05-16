const URL_BASE = 'http://localhost:3000/books/';

let idField;
let titleField;
let priceField;
let searchField;

function initComponents() {
    idField = document.getElementById("id");
    titleField = document.getElementById("title");
    priceField = document.getElementById("price");
    searchField = document.getElementById("search");
}

function loadTable(){
    searchField.value = "";
    fetch(URL_BASE)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById("tbody");
            let html = "";
            data.forEach((book) => {
                html += `<tr>
                            <th scope="row">${book.id}</th>
                            <td>${book.title}</td>
                            <td>${book.price}</td>
                            <td><button class="btn btn-warning" onclick="editBook('${book.id}')">Edit</button></td>
                            <td><button class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete</button></td>
                        </tr>`
            });
            tbody.innerHTML = html;
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function search(){
    fetch(`${URL_BASE}${searchField.value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(book => {
            console.log('Success:', book);
            const tbody = document.getElementById("tbody");
            tbody.innerHTML = `<tr>
                            <th scope="row">${book.id}</th>
                            <td>${book.title}</td>
                            <td>${book.price}</td>
                            <td><button class="btn btn-warning" onclick="editBook('${book.id}')">Edit</button></td>
                            <td><button class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete</button></td>
                            </tr>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function editBook(id) {
    fetch(`${URL_BASE}${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            idField.value = id;
            titleField.value = data.title;
            priceField.value = data.price;
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function clearFields() {
    idField.value = "";
    titleField.value = "";
    priceField.value = "";
}

function sendBook() {
    const data = {};

    data.title = titleField.value;
    data.price = priceField.value;

    const options = {
        method: idField.value != "" ? "PUT": "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(URL_BASE + (idField.value != "" ? idField.value : ""), options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            loadTable();
            clearFields();
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deleteBook(id) {
    const options = {
        method: 'DELETE'
    };

    fetch(`${URL_BASE}${id}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            loadTable();
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.onload = function(){
    initComponents();
    loadTable();
}