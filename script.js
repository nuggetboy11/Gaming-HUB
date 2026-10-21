
const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".game-card")];
const empty = document.getElementById("empty");

search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const text = (
      card.innerText + " " + card.dataset.search
    ).toLowerCase();

    const matches = text.includes(query);
    card.hidden = !matches;

    if (matches) visible++;
  });

  empty.hidden = visible !== 0;
});
