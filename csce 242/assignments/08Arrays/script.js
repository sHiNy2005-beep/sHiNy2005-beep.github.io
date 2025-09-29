const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const closeBtn = document.getElementById("close");

const dogCards = document.querySelectorAll(".dog-card");

dogCards.forEach((card) => {
    const dogImg = card.querySelector("img");

    dogImg.addEventListener("click", () => {
        console.log("Dog clicked:", card.getAttribute("data-title"));

        popupImg.src = card.getAttribute("data-after");
        popupTitle.textContent = card.getAttribute("data-title");

        if (!document.body.contains(popup)) {
            document.body.appendChild(popup);
        }

        popup.classList.remove("hidden");

        const cardRect = card.getBoundingClientRect();

        let top = cardRect.top - popup.offsetHeight - 8;

        if (top < 8) {
            top = cardRect.bottom + 8;
        }

        let left = cardRect.left + (cardRect.width / 2) - (popup.offsetWidth / 2);

        if (left < 8) left = 8;
        if (left + popup.offsetWidth > window.innerWidth - 8) {
            left = window.innerWidth - popup.offsetWidth - 8;
        }

        popup.style.top = top + "px";
        popup.style.left = left + "px";
    });
});

closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});
