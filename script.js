//1. Creating the Book Class: Create a Book class with properties for title, author, and category.
// Include a constructor to initialize these properties.

class Book {
    constructor(title, author, category)
    {
        this.title = title;
        this.author = author;
        this.category = category;
    }        
}

//2. Adding Books to Inventory: Implement a function addBook() that creates a new Book
//object from input fields in the HTML and adds it to an array named inventory. After adding
//a book, clear the input fields

let inventory = [];


function clearInputFields() {
    document.getElementById("title").value= "";
    document.getElementById("author").value= "";
    document.getElementById("category").value= "";
}

// update ideas: no empty fields(need to fill all fields), ID for every book? (for deleting),
//delete button for all and by ID,  
function addBook() {
    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();
    let category = document.getElementById("category").value.trim();

    if(title === "" || author === "" || category === ""){
        alert("Please fill all fields");
        return;
    }

    const newBook = new Book(title, author, category);
    inventory.push(newBook);

    saveInventory();
    clearInputFields();
    displayInventory();
}

 


//3. Displaying the Inventory: Implement a function displayInventory() that iterates over the
//inventory array and displays each book’s details in the #inventory div. Include the book’s
//title, author, and category in the display.

function displayInventory() {
    let inventorylist = document.getElementById("inventory");
    inventorylist.innerHTML = "";

    for (let i = 0; i < inventory.length; i++) {
        let book = inventory[i];
        // Create a new div element
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book-item"); //for css styling

        // add book details to the div
        bookDiv.textContent = `${book.title} by ${book.author} (${book.category})`;

        //delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function() {deleteBook(i);};

        bookDiv.appendChild(deleteButton);
        inventorylist.appendChild(bookDiv);
    }
        
}

//4. Searching for Books by Category: Implement a function searchBooks() that filters the
//inventory array for books matching the category entered in the #searchCategory input field.
//Use this function to display only the books that match the search criteria.

function searchBooks() {
    let searchCategory = document.getElementById("searchCategory").value.trim().toLowerCase();

    if(searchCategory === ""){
        displayInventory();
        return;
    }

    let inventorylist = document.getElementById("inventory");
    inventorylist.innerHTML = "";

    for (let i = 0; i < inventory.length; i++) {
        let book = inventory[i];

        if (book.category.toLowerCase() === searchCategory || searchCategory === ""){
            
            let bookDiv = document.createElement("div");
            bookDiv.classList.add("book-item"); //for css styling
            bookDiv.textContent = `${book.title} by ${book.author} (${book.category})`;
            inventorylist.appendChild(bookDiv);
        }    
    }
}


//5. (Optional Advanced Task) Save and Load Inventory using JSON:Implement functionality to save the current 
// inventory to JSON when a book is added and load the inventory from
//JSON when the page is loaded. Use localStorage for storing the JSON string.

function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function loadInventory() {
    if(localStorage.getItem("inventory")){
        inventory = JSON.parse(localStorage.getItem("inventory"));
        inventory = storedBooks.map(book => new Book(book.title, book.author, book.category));   
    }
    displayInventory();
}


//6. Deleting Books: Implement a function deleteBook() that removes a book from the
//inventory array when the delete button is clicked.

function deleteBook(index) {
    inventory.splice(index, 1);
    saveInventory();
    displayInventory();
}

window.onload = loadInventory;