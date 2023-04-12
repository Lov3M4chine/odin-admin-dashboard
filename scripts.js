// Get reference to the button, card form, and card container elements
const newButton = document.getElementById("new-button");
const cardForm = document.getElementById("cardForm");
const cardModal = document.getElementById("card-modal");
const cardsContainer = document.getElementsByClassName("cards-container");
const closeButton = document.getElementsByClassName("close")[0];

// Show the new card modal when the button is clicked
newButton.addEventListener('click', () => {
    cardModal.style.display = 'block';
});

// Hide the new card modal when form submission is complete
const hideModal = () => {
    modal.style.display = 'none';
};

// Add a click event listener to the exit button
closeButton.addEventListener("click", function () {
    modal.style.display = "none";
});

// Close the modal when clicking out of the modal content
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
})

// Event listener for the form submission
cardForm.addEventListener("submit", (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form input values
    const cardTitle = document.getElementById('cardTitle').value;
    const cardContent = document.getElementById('cardContent').value;
    const cardGitLink = document.getElementById('cardGitLink').value;
    const cardLiveLink = document.getElementById('cardLiveLink').value;

    // Create a new card element
    const card = document.createElement('div');
    card.className = 'card';

    // Create and set the title element
    const title = document.createElement('p');
    title.className = "card-title";
    title.textContent = cardTitle;

    // Create and set the content element
    const content = document.createElement('p');
    content.className = "card-text"
    content.textContent = cardContent;

    // Create a container for the icons
    const cardIconContainer = document.createElement("div");
    cardIconContainer.className = "card-icon-container";

    // Create and set the live link icon element
    const liveLink = document.createElement('img');
    liveLink.className = "icons";
    liveLink.src = "imgs/icons/view.svg";
    liveLink.alt = "View icon";

    // Create and set the Git link icon element
    const gitLink = document.createElement('img');
    gitLink.className = "icons";
    gitLink.src = "imgs/icons/git.svg";
    gitLink.alt = "Git icon";

    // Create anchor elements for the icons and set href attributes
    const liveLinkAnchor = document.createElement('a');
    liveLinkAnchor.href = cardLiveLink;
    liveLinkAnchor.target = "_blank";
    liveLinkAnchor.appendChild(liveLink);

    const gitLinkAnchor = document.createElement('a');
    gitLinkAnchor.href = cardGitLink;
    gitLinkAnchor.target = "_blank";
    gitLinkAnchor.appendChild(gitLink);

    // Build the card structure
    card.appendChild(title);
    card.appendChild(content);
    cardIconContainer.appendChild(liveLinkAnchor);
    cardIconContainer.appendChild(gitLinkAnchor);
    card.appendChild(cardIconContainer);

    // Append the new card to the cards container
    cardsContainer.appendChild(card);

    // Reset the form
    cardForm.reset();
    hideModal();
});

