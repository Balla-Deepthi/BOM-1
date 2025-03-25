let container = document.querySelector(".container");
let categorySelect = document.getElementById("categorySelect");

async function getData() {
    try {
        let response = await fetch("https://equal-regal-trapezoid.glitch.me/products");
        if (!response.ok) {
            throw new Error("HTTP Error", response.status);
        }
        let result = await response.json();
        localStorage.setItem("Products", JSON.stringify(result));

        let products = JSON.parse(localStorage.getItem("Products"));
        displayData(products);
        displayDropdown(products);
    } catch (error) {
        console.error(error);
    }
}

function displayData(products) {
    container.innerHTML = '';

    if (products === null || products.length === 0) {
        container.innerHTML = `<h1>No Data available</h1>`;
    } else {
        products.forEach(obj => {
            let item = document.createElement("div");
            item.dataset.id = obj.id; // Storing the ID in the data-id attribute for easy access
            item.innerHTML = `
                <img src="${obj.image}" alt="${obj.title}">
                <p><b>Title:</b> ${obj.title}</p>
                <p><b>Price:</b> $${obj.price}</p>
                <p><b>Description: </b>${obj.description}</p>
                <p><b>Category:</b> ${obj.category}</p>
                <button class="delete" onclick="deleteData('${obj.id}', this)">Delete</button>
            `;
            container.appendChild(item);
        });
    }
}

async function deleteData(id, button) {
    try {
        // Log the product ID for debugging purposes
        console.log("Deleting product with ID:", id);
        
        let response = await fetch(`https://equal-regal-trapezoid.glitch.me/products/${id}`, { 
            method: "DELETE" 
        });

        // Log the response for debugging purposes
        console.log("Response status:", response.status);

        if (response.ok) {
            alert("Data Deleted");

            // Remove the item from the DOM immediately after deletion
            let productElement = button.parentElement; // Access the parent element (the product div)
            productElement.remove();

            // Optionally, you can re-fetch the data to make sure everything is synced
            getData();
        } else {
            alert("Failed to delete product, status: " + response.status);
            console.error("Error deleting product:", response.status);
        }
    } catch (error) {
        console.error("Error during deletion:", error);
        alert("There was an error while deleting the product.");
    }
}


function displayDropdown(products) {
    let categories = Array.from(new Set(products.map(product => product.category)));

    categorySelect.innerHTML = `<option value="all Categories">All Categories</option>`;
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

categorySelect.addEventListener("change", function() {
    let selectedCategory = categorySelect.value;
    let products = JSON.parse(localStorage.getItem("Products"));

    if (selectedCategory == "all Categories") {
        displayData(products);
    } else {
        let filteredProducts = products.filter(product => product.category === selectedCategory);
        displayData(filteredProducts);
    }
});

getData();
