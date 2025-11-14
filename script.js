// ----- Music -----
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "⏸ Pause Music";
  } else {
    music.pause();
    musicBtn.textContent = "🎵 Play Music";
  }
});

// ----- Slideshow -----
let slideIndex = 0;
showSlides();
function showSlides() {
  let slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

// ----- Memory Game -----
const gameContainer = document.querySelector(".memory-game");
const images = [
  "images/pic1.jpg",
  "images/pic2.jpg",
  "images/pic3.jpg",
  "images/pic1.jpg",
  "images/pic2.jpg",
  "images/pic3.jpg",
  "images/pic4.jpg",
  "images/pic4.jpg"
];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createCards() {
  gameContainer.innerHTML = "";
  const shuffled = images.sort(() => 0.5 - Math.random());
  shuffled.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.innerHTML = `
      <img class="front-face" src="${img}" alt="front">
      <img class="back-face" src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="back">
    `;
    gameContainer.appendChild(card);
  });
  addFlipLogic();
}

function addFlipLogic() {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach(card => card.addEventListener('click', flipCard));

  function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.querySelector(".front-face").src === secondCard.querySelector(".front-face").src;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
}

document.getElementById("replay").addEventListener('click', createCards);
createCards();

// ----- Falling Hearts -----
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 2 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// ----- Letter Animation -----
const message = `
Happiest birthday🎂 my cutie pie🥰,  my matka⚡, my gainda🧿 , my partner 🫂, my cute si doll🩷 , my everything.. On this beautiful day ✨may god bless you always , fullfill ur all dreams☺...
Always stay happy 😄and keep smiling 😊.  
I know this year and some upcoming -we are not together but still very close😘 to you , the memories🥹 we created together, the time we spent literally I can't describe in this chat box 💌.. that was beyond my words .. I don't know what good works I had done before that I got u as my bestfriend🫠, my partner🫂,my sister 🪆and most important my family❤... As a single person you played many  roles🫶 in my life .. Really very happy to have you in my life🫀 ...I love you so so much 😘❤..and missing❤‍🩹 you here each day .. The way you tookcare of me no one has done before🥹..   Really I miss u my matku❤...Wishing you the day as 🥰amazing as you are!   LOVE YOU 😘😘

`;

let i = 0;
function typeLetter() {
  if (i < message.length) {
    document.getElementById("letter-text").innerHTML += message.charAt(i);
    i++;
    setTimeout(typeLetter, 70);
  }
}
window.onload = typeLetter;
