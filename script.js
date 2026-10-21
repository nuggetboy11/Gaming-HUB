
const search = document.getElementById("search");
const cards = [...document.querySelectorAll(".card")];
const empty = document.getElementById("empty");

if (search) {
  search.addEventListener("input", () => {
    const query = search.value.toLowerCase().trim();
    let count = 0;

    cards.forEach(card => {
      const matches =
        (card.innerText + " " + card.dataset.search)
          .toLowerCase().includes(query);

      card.hidden = !matches;
      if (matches) count++;
    });

    empty.hidden = count > 0;
  });
}
