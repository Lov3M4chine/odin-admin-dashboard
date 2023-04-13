// Get reference to the button, card form, and card container elements
const newButton = document.getElementById("new-button");
const cardForm = document.getElementById("cardForm");
const cardModal = document.getElementById("card-modal");
const cardsContainer = document.querySelector(".cards-container");
const closeButton = document.querySelector(".close");
const cards = document.querySelectorAll('.card');
const overlay = document.querySelector(".overlay");

// Function to save card data to localStorage
function saveCardData(title, content, gitLink, liveLink) {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const newCard = { title, content, gitLink, liveLink };
    cards.push(newCard);
    localStorage.setItem("cards", JSON.stringify(cards));
}

// Function to create a card from data and append it to the cards container
function createCardFromData(title, content, gitLink, liveLink) {
    // Create a new card element
    const card = document.createElement('div');
    card.className = 'card';

    // Create and set the title element
    const titleElement = document.createElement('p');
    titleElement.className = "card-title";
    titleElement.textContent = title;

    // Create and set the content element
    const contentElement = document.createElement('p');
    contentElement.className = "card-text";
    contentElement.textContent = content;

    // Create a container for the icons
    const cardIconContainer = document.createElement("div");
    cardIconContainer.className = "card-icon-container";

    // Create and set the live link icon element
    const liveLinkIcon = document.createElement('img');
    liveLinkIcon.className = "icons";
    liveLinkIcon.src = "imgs/icons/view.svg";
    liveLinkIcon.alt = "View icon";

    // Create and set the Git link icon element
    const gitLinkIcon = document.createElement('img');
    gitLinkIcon.className = "icons";
    gitLinkIcon.src = "imgs/icons/git.svg";
    gitLinkIcon.alt = "Git icon";

    // Create anchor elements for the icons and set href attributes
    const liveLinkAnchor = document.createElement('a');
    liveLinkAnchor.href = liveLink;
    liveLinkAnchor.target = "_blank";
    liveLinkAnchor.appendChild(liveLinkIcon);

    const gitLinkAnchor = document.createElement('a');
    gitLinkAnchor.href = gitLink;
    gitLinkAnchor.target = "_blank";
    gitLinkAnchor.appendChild(gitLinkIcon);

    // Build the card structure
    card.appendChild(titleElement);
    card.appendChild(contentElement);
    cardIconContainer.appendChild(liveLinkAnchor);
    cardIconContainer.appendChild(gitLinkAnchor);
    card.appendChild(cardIconContainer);

    // Append the new card to the cards container
    cardsContainer.appendChild(card);
}

// Function to load and display cards from localStorage when the page is loaded
function loadCards() {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    for (const card of cards) {
        createCardFromData(card.title, card.content, card.gitLink, card.liveLink);
    }
}

// Load cards when the page is loaded
loadCards();

// Show the new card modal when the button is clicked
newButton.addEventListener('click', () => {
    cardModal.style.display = 'block';
});

// Hide the new card modal when form submission is complete
const hideModal = () => {
    cardModal.style.display = 'none';
};

// Add a click event listener to the exit button
closeButton.addEventListener("click", function () {
    cardModal.style.display = "none";
});

// Function to show the enlarged card
function showEnlargedCard(cardHtml) {
    const cardEnlargedView = document.createElement('div');
    cardEnlargedView.id = 'card-enlarged-view';
    cardEnlargedView.innerHTML = cardHtml;
    cardEnlargedView.style.display = "flex";
    overlay.style.display = "block";
    overlay.appendChild(cardEnlargedView)
  }

  cards.forEach(card => {
    const cardHtml = card.innerHTML;
    card.addEventListener('click', () => { 
      // Show the enlarged card
      showEnlargedCard(cardHtml);
    });
  });

  // Function to hide the enlarged card
  function hideEnlargedCard() {
    // Remove the enlarged card view from the overlay
    const cardEnlargedView = document.getElementById('card-enlarged-view');
    if (cardEnlargedView) {
      overlay.removeChild(cardEnlargedView);
    }
    // Toggle the display of the overlay element
    overlay.style.display = "none";
  }

// Event listener for the form submission
cardForm.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form input values
    const cardTitle = document.getElementById('cardTitle').value;
    const cardContent = document.getElementById('cardContent').value;
    const cardGitLink = document.getElementById('cardGitLink').value;
    const cardLiveLink = document.getElementById('cardLiveLink').value;

    // Save the card data to localStorage
    saveCardData(cardTitle, cardContent, cardGitLink, cardLiveLink);

    // Create and append the new card
    createCardFromData(cardTitle, cardContent, cardGitLink, cardLiveLink);

    // Reset the form
    cardForm.reset();
    hideModal();
});

overlay.addEventListener("click", hideEnlargedCard);
