const cardWraps = document.querySelectorAll(".card_wrap");
const cards = document.querySelectorAll(".card");

let pttvel = false;
let stugum = false;
let firstCard, secondCard;

function flipCard() {
    if (stugum) return;
    if (this === firstCard) return;

    this.classList.add("open");

    if (!pttvel) {
        pttvel = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    console.log(isMatch, firstCard.dataset.framework, secondCard.dataset.framework);
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();
}

function unflipCards() {
    stugum = true;

    firstCard.classList.add("unmatched");
    secondCard.classList.add("unmatched");

    setTimeout(() => {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        firstCard.classList.remove("unmatched");
        secondCard.classList.remove("unmatched");

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [pttvel, stugum] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function suffle() {
    cardWraps.forEach((cardWrap) => {
        let randomPos = Math.floor(Math.random() * 12);
        cardWrap.style.order = randomPos;
    });
})();

setTimeout(() => {
    cards.forEach((card) => {
        card.classList.add("open");
    });
}, 100);

setTimeout(() => {
    cards.forEach((card) => {
        card.classList.remove("open");
    });
}, 4000);

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});