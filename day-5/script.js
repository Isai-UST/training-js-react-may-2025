const URL_BASE = 'http://localhost:3000/books/';

function loadTable(){
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
            data.forEach((book, i) => {
                html += `<tr>
                            <th scope="row">${i+1}</th>
                            <td>${book.title}</td>
                            <td>${book.price}</td>
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

function addBook() {
    const data = {};
    data.title = document.getElementById("title").value;
    data.price = document.getElementById("price").value;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(URL_BASE, options)
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
    loadTable();
}