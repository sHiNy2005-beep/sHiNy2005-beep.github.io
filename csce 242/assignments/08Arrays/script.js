console.log("Script loaded ✅"); // sanity check

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const closeBtn = document.getElementById("close");

// Get all dog cards
const dogCards = document.querySelectorAll(".dog-card");

dogCards.forEach((card) => {
    const dogImg = card.querySelector("img");

    dogImg.addEventListener("click", () => {
        console.log("Dog clicked:", card.getAttribute("data-title"));

        // Update popup content
        popupImg.src = card.getAttribute("data-after");
        popupTitle.textContent = card.getAttribute("data-title");

        // Attach popup to body so it floats
        document.body.appendChild(popup);

        // Show popup first so it has size
        popup.classList.remove("hidden");
        popup.style.position = "absolute";
        popup.style.zIndex = "9999";

        // Wait for layout, then calculate
        requestAnimationFrame(() => {
            const cardRect = card.getBoundingClientRect();

            // Try above first
            let top = window.scrollY + cardRect.top - popup.offsetHeight - 8;

            // If no room above, put below
            if (top < window.scrollY) {
                top = window.scrollY + cardRect.bottom + 8;
            }

            // Center horizontally over the card
            let left = window.scrollX + cardRect.left + (cardRect.width / 2) - (popup.offsetWidth / 2);

            // Prevent offscreen left
            if (left < 8) left = 8;

            // Prevent offscreen right
            if (left + popup.offsetWidth > window.innerWidth - 8) {
                left = window.innerWidth - popup.offsetWidth - 8;
            }

            // Apply final position
            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
        });
    });
});

// Close popup
closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    document.body.appendChild(popup); // reset for next use
});
