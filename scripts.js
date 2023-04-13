// Get reference to the button, card form, and card container elements
const newButton = document.getElementById("new-button");
const cardForm = document.getElementById("cardForm");
const cardModal = document.getElementById("card-modal");
const cardsContainer = document.querySelector(".cards-container");
const closeButton = document.querySelector(".close");
const cards = document.querySelectorAll('.card');
const overlay = document.querySelector(".overlay");
const leftContainer = document.querySelector(".left-container");
const rightContainer = document.querySelector(".right-container");
const searchBar = document.querySelector('.search-bar');

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

    // Create close button
    const closeButton = document.createElement('div');
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";
    card.appendChild(closeButton);

    // Attach click event to the close button
    attachCloseButtonClickEvent(card, closeButton, title, content, gitLink, liveLink);

  

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
    liveLinkIcon.id = "view-icon";
    liveLinkIcon.title = "View live page";

    // Create and set the Git link icon element
    const gitLinkIcon = document.createElement('img');
    gitLinkIcon.className = "icons";
    gitLinkIcon.src = "imgs/icons/git.svg";
    gitLinkIcon.alt = "Git icon";
    gitLinkIcon.id = "git-icon";
    gitLinkIcon.title = "View on Github";

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

    // Attach click event to the new card
    attachCardClickEvent(card);
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

document.querySelectorAll('.card').forEach(card => {
    const closeButton = card.querySelector('.close-button');
    const title = card.querySelector('.card-title').textContent;
    const content = card.querySelector('.card-text').textContent;
    const gitLink = card.querySelector('#git-icon').parentElement.href;
    const liveLink = card.querySelector('#view-icon').parentElement.href;
  
    attachCloseButtonClickEvent(card, closeButton, title, content, gitLink, liveLink);
  });

// Show the new card modal when the button is clicked
newButton.addEventListener('click', () => {
    cardModal.style.display = 'block';
    overlay.style.display = "none";
    leftContainer.style.filter = "blur(5px)";
    rightContainer.style.filter = "blur(5px)";

});

// Hide the new card modal when form submission is complete
const hideModal = () => {
    cardModal.style.display = 'none';
};

// Add a click event listener to the exit button
closeButton.addEventListener("click", function () {
    cardModal.style.display = "none";
    leftContainer.style.filter = "none";
    rightContainer.style.filter = "none";
});

// Function to show the enlarged card
function showEnlargedCard(cardHtml) {
    const cardEnlargedView = document.createElement('div');
    cardEnlargedView.id = 'card-enlarged-view';
    cardEnlargedView.innerHTML = cardHtml;
    cardEnlargedView.style.display = "flex";
    overlay.style.display = "block";
    leftContainer.style.filter = "blur(5px)";
    rightContainer.style.filter = "blur(5px)";
    overlay.appendChild(cardEnlargedView)
  }

  cards.forEach(card => {
    attachCardClickEvent(card);
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
    leftContainer.style.filter = "none";
    rightContainer.style.filter = "none";
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
    overlay.style.display = "none";
    leftContainer.style.filter = "none";
    rightContainer.style.filter = "none";
});

overlay.addEventListener("click", hideEnlargedCard);

document.getElementById("searchBar").addEventListener("keyup", function () {
    // Get the search input value
    const searchValue = this.value.toLowerCase();
  
    // Get all the card elements
    const cards = document.getElementsByClassName("card");
    const noCardsMessage = document.querySelector(".no-cards-message");
  
    let visibleCardCount = 0;
  
    // Loop through the cards and filter based on search input
    for (let i = 0; i < cards.length; i++) {
      const cardTitle = cards[i].querySelector(".card-title").textContent.toLowerCase();
  
      if (cardTitle.includes(searchValue)) {
        cards[i].style.display = "block";
        visibleCardCount++;
      } else {
        cards[i].style.display = "none";
      }
    }
  
    // Show or hide the no-cards-message div based on the number of visible cards
    if (visibleCardCount === 0) {
      noCardsMessage.style.display = "block";
    } else {
      noCardsMessage.style.display = "none";
    }
  });

  function attachCardClickEvent(card) {
    const cardHtml = card.innerHTML;
    card.addEventListener('click', () => { 
      // Show the enlarged card
      showEnlargedCard(cardHtml);
    });
  }
  
  function attachCloseButtonClickEvent(card, closeButton, title, content, gitLink, liveLink) {
    closeButton.addEventListener('click', (event) => {
      // Prevent event propagation to the card element
      event.stopPropagation();
  
      // Prompt the user if they want to delete the card
      const deleteCard = confirm("Are you sure you want to delete this card?");
  
      if (deleteCard) {
        // Remove the card from the DOM
        card.remove();
  
        // Remove the card from localStorage
        const cards = JSON.parse(localStorage.getItem("cards")) || [];
        const updatedCards = cards.filter(c => c.title !== title || c.content !== content || c.gitLink !== gitLink || c.liveLink !== liveLink);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
      }
    });
  }
  
  
