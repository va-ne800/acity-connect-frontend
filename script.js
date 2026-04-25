const listings = [
  {
    title: "Used Calculus Textbook",
    description: "Clean second-hand calculus textbook available for sale.",
    category: "Item",
    status: "Available",
    owner: "Michael"
  },
  {
    title: "Python Tutoring",
    description: "I can help students understand Python basics and assignments.",
    category: "Skill",
    status: "Available",
    owner: "Ama"
  },
  {
    title: "Scientific Calculator",
    description: "Casio scientific calculator in good condition.",
    category: "Item",
    status: "Sold",
    owner: "Kojo"
  },
  {
    title: "Graphic Design Help",
    description: "I can design flyers, posters, and presentation slides.",
    category: "Skill",
    status: "Available",
    owner: "Edith"
  }
];

function displayListings(items) {
  const listingGrid = document.getElementById("listingGrid");
  listingGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "listing-card";

    card.innerHTML = `
      <span class="badge">${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p><strong>Status:</strong> ${item.status}</p>
      <p><strong>Owner:</strong> ${item.owner}</p>
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

function addListing() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;

  if (!title || !description || !category) {
    alert("Please fill all required fields.");
    return;
  }

  const newListing = {
    title,
    description,
    category,
    status,
    owner: "Current User"
  };

  listings.push(newListing);
  displayListings(listings);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("status").value = "Available";

  alert("Listing added successfully. Later, backend will save it permanently.");
}

function showInterest(title) {
  alert(`You showed interest in: ${title}`);
}

displayListings(listings);