const API_URL = "https://acity-connect-backend-1o1q.onrender.com/api/listings";

let listings = [];

// 🔥 FETCH listings from backend
async function fetchListings() {
  try {
    const response = await fetch(API_URL);
    listings = await response.json();
    displayListings(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

function displayListings(items) {
  const listingGrid = document.getElementById("listingGrid");
  listingGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "listing-card";

    card.innerHTML = `
      <span class="badge">${item.category || "Item"}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p><strong>Price:</strong> ${item.price || "N/A"}</p>
      <button onclick="showInterest('${item.title}')">Interested</button>
    `;

    listingGrid.appendChild(card);
  });
}

function filterListings() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const categoryValue = document.getElementById("categoryFilter").value;

  const filtered = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "all" || item.category === categoryValue;

    return matchesSearch && matchesCategory;
  });

  displayListings(filtered);
}

// 🔥 ADD listing to backend
async function addListing() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;

  if (!title || !description || !category) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        price: 0,
        image_url: "",
      }),
    });

    const newItem = await response.json();

    listings.unshift(newItem);
    displayListings(listings);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("status").value = "Available";

    alert("Listing saved to database ✅");
  } catch (error) {
    console.error("Error adding listing:", error);
  }
}

function showInterest(title) {
  alert(`You showed interest in: ${title}`);
}

// 🔥 Load real data on page load
fetchListings();