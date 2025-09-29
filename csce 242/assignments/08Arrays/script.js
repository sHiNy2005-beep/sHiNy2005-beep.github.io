const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const closeBtn = document.getElementById("close");

const dogCards = document.querySelectorAll(".dog-card");

dogCards.forEach((card) => {
    const dogImg = card.querySelector("img");

    dogImg.addEventListener("click", () => {
        popupImg.src = card.getAttribute("data-after");
        popupTitle.textContent = card.getAttribute("data-title");

        if (!document.body.contains(popup)) {
            document.body.appendChild(popup);
        }

        popup.classList.remove("hidden");

        const cardRect = card.getBoundingClientRect();

        popup.style.top = cardRect.top + "px";
        popup.style.left = cardRect.left + "px";
        popup.style.width = cardRect.width + "px";
        popup.style.height = cardRect.height + "px";
    });
});

closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});
