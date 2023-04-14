// === DOM Element References ===

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

// === Function Definitions===

function enableOverlay () {
    overlay.style.display = "block";
    leftContainer.style.filter = "blur(5px)";
    rightContainer.style.filter = "blur(5px)";
}

function disableOverlay () {
    overlay.style.display = "none";
    leftContainer.style.filter = "none";
    rightContainer.style.filter = "none";
}

// Function to save card data to localStorage
function saveCardData(title, content, gitLink, liveLink) {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const newCard = { title, content, gitLink, liveLink };
    cards.push(newCard);
    localStorage.setItem("cards", JSON.stringify(cards));
}

function createCardElement() {
    const card = document.createElement('div');
    card.className = 'card';
    return card;
  }
  
  function createCloseButtonElement() {
    const closeButton = document.createElement('div');
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";
    return closeButton;
  }
  
  function createTitleElement(title) {
    const titleElement = document.createElement('p');
    titleElement.className = "card-title";
    titleElement.textContent = title;
    return titleElement;
  }
  
  function createContentElement(content) {
    const contentElement = document.createElement('p');
    contentElement.className = "card-text";
    contentElement.textContent = content;
    return contentElement;
  }
  
  function createCardIconContainer() {
    const cardIconContainer = document.createElement("div");
    cardIconContainer.className = "card-icon-container";
    return cardIconContainer;
  }
  
  function createIconElement(className, src, alt, id, title) {
    const icon = document.createElement('img');
    icon.className = className;
    icon.src = src;
    icon.alt = alt;
    icon.id = id;
    icon.title = title;
    return icon;
  }
  
  function createLinkElement(href, target, child) {
    const link = document.createElement('a');
    link.href = href;
    link.target = target;
    link.appendChild(child);
    return link;
  }
  
  // Prevent event propagation to the card element
  function handleIconClick(event) {
    event.stopPropagation();
  }

  function attachIconClickEvent(iconElement) {
    iconElement.addEventListener('click', handleIconClick);
  }
  
  function createCardFromData(title, content, gitLink, liveLink) {
    // Create card and its components
    const card = createCardElement();
    const closeButton = createCloseButtonElement();
    card.appendChild(closeButton);
  
    attachCloseButtonClickEvent(card, closeButton, title, content, gitLink, liveLink);
  
    // Build the card structure
    const titleElement = createTitleElement(title);
    const contentElement = createContentElement(content);
    const cardIconContainer = createCardIconContainer();
  
    const liveLinkIcon = createIconElement("icons", "imgs/icons/view.svg", "View icon", "view-icon", "View live page");
    const gitLinkIcon = createIconElement("icons", "imgs/icons/git.svg", "Git icon", "git-icon", "View on Github");
  
    const liveLinkAnchor = createLinkElement(liveLink, "_blank", liveLinkIcon);
    const gitLinkAnchor = createLinkElement(gitLink, "_blank", gitLinkIcon);

    // Attach the handleIconClick event to the liveLinkAnchor and gitLinkAnchor elements
    liveLinkAnchor.addEventListener("click", handleIconClick);
    gitLinkAnchor.addEventListener("click", handleIconClick);
  
    // Append the new card to the cards container and attach the click event
    card.appendChild(titleElement);
    card.appendChild(contentElement);
    cardIconContainer.appendChild(liveLinkAnchor);
    cardIconContainer.appendChild(gitLinkAnchor);
    card.appendChild(cardIconContainer);
  
    cardsContainer.appendChild(card);
  
    attachCardClickEvent(card);
  }
  

// Function to load and display cards from localStorage when the page is loaded
function loadCards() {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    for (const card of cards) {
        createCardFromData(card.title, card.content, card.gitLink, card.liveLink);
    }
}

// Function to show the enlarged card
function showEnlargedCard(cardHtml) {
    const cardEnlargedView = document.createElement('div');
    cardEnlargedView.id = 'card-enlarged-view';
    cardEnlargedView.innerHTML = cardHtml;
    cardEnlargedView.style.display = "flex";
    enableOverlay ();

    overlay.appendChild(cardEnlargedView)
  }

// Function to hide the enlarged card
function hideEnlargedCard() {
    // Remove the enlarged card view from the overlay
    const cardEnlargedView = document.getElementById('card-enlarged-view');
    if (cardEnlargedView) {
        overlay.removeChild(cardEnlargedView);
    }
    
    disableOverlay()
}
// Attach a click event listener to a card, which will show an enlarged version of the card when clicked
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

// === Event Listeners ===

// Show the new card modal when the button is clicked
newButton.addEventListener('click', () => {
    cardModal.style.display = 'block';
    enableOverlay();
});

// Add a click event listener to the exit button
closeButton.addEventListener("click", function () {
    cardModal.style.display = "none";
    disableOverlay();
});

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
    cardModal.style.display = 'none';
    disableOverlay();
});

overlay.addEventListener("click", hideEnlargedCard);

document.getElementById("searchBar").addEventListener("keyup", function () {
    // Get the search input value
    const searchValue = this.value.toLowerCase();
  
    // Get all the card elements
    const cards = document.getElementsByClassName("card");
    const noCardsMessage = document.querySelector(".no-cards-message");
  
    // Declare a variable to store the number of visible cards
    let visibleCardCount = 0;
  
    // Loop through the cards and filter based on search input
    for (let i = 0; i < cards.length; i++) {
      const cardTitle = cards[i].querySelector(".card-title").textContent.toLowerCase();
        
        // Check if the card title includes the search value; if so, display the card and increase the visible card count, otherwise, hide the card
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


// Add a click event listener to the 'toggle-button' element to show/hide the left container
document.getElementById('toggle-button').addEventListener('click', function() {
    const leftContainer = document.querySelector('.left-container');
    leftContainer.classList.toggle('visible');
});

// Iterate through all cards and attach a click event to each card.
cards.forEach(card => {
    const liveLinkIcon = card.querySelector('#view-icon');
    const gitLinkIcon = card.querySelector('#git-icon');
    attachCardClickEvent(card);
    attachIconClickEvent(liveLinkIcon);
    attachIconClickEvent(gitLinkIcon);
});

// Iterate through all cards, retrieve the relevant data, and attach a click event to the close button of each card.
document.querySelectorAll('.card').forEach(card => {
    const closeButton = card.querySelector('.close-button');
    const title = card.querySelector('.card-title').textContent;
    const content = card.querySelector('.card-text').textContent;
    const gitLink = card.querySelector('#git-icon').parentElement.href;
    const liveLink = card.querySelector('#view-icon').parentElement.href;
    attachCloseButtonClickEvent(card, closeButton, title, content, gitLink, liveLink);
});

// === Initialization ===

// Load cards when the page is loaded
loadCards();