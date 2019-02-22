const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard){
        //pierwsze kliknięcie
        hasFlippedCard = true;
        firstCard = this;
    } else {
        //drugie kliknięcie
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    //    sprawdzenie zgodności
    //     console.log(firstCard.dataset.framework);
    //     console.log(secondCard.dataset.framework);
    // if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //     //     //    są parą
    //     //     correct();
    //     // }else {
    //     //     //     nie są parą
    //     //     incorrect();
    //     // }

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? correct() : incorrect();
}

function correct(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

}

function incorrect(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));