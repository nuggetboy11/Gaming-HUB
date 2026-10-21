
const welcome = document.getElementById("welcome");
const hub = document.getElementById("hub");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const popupMessage = document.getElementById("popupMessage");

const search = document.getElementById("search");
const games = [...document.querySelectorAll(".game-card")];
const noResults = document.getElementById("noResults");
const gameCount = document.getElementById("gameCount");

// Unlock the gaming hub
yes.addEventListener("click", () => {
  welcome.remove();
  hub.classList.remove("locked");
  search.focus();
});

// Make NO dodge the cursor
function dodgeNoButton() {
  const area = document.querySelector(".buttons");
  const maxX = Math.min(130, window.innerWidth * 0.25);
  const maxY = 65;

  const x = (Math.random() * 2 - 1) * maxX;
  const y = (Math.random() * 2 - 1) * maxY;

  no.style.transform = `translate(${x}px, ${y}px)`;
  popupMessage.textContent = "Nice try 😂 Try YES!";
}

no.addEventListener("pointerenter", dodgeNoButton);

no.addEventListener("click", (event) => {
  event.preventDefault();
  dodgeNoButton();
});

// Search games
search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  games.forEach((game) => {
    const searchable =
      (game.dataset.name + " " + game.innerText).toLowerCase();

    const matches = searchable.includes(query);
    game.hidden = !matches;

    if (matches) visible++;
  });

  gameCount.textContent = `${visible} ${visible === 1 ? "GAME" : "GAMES"}`;
  noResults.hidden = visible !== 0;
});
