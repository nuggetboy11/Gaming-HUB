
const searchForm = document.getElementById("searchForm");
const search = document.getElementById("search");
const urlForm = document.getElementById("urlForm");
const urlInput = document.getElementById("url");
const message = document.getElementById("message");

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const query = search.value.trim();
  if (!query) return;

  const searchUrl = new URL("https://www.google.com/search");
  searchUrl.searchParams.set("q", query);

  window.open(searchUrl.href, "_blank", "noopener,noreferrer");
});

urlForm.addEventListener("submit", event => {
  event.preventDefault();

  let address = urlInput.value.trim();
  if (!address) return;

  if (!/^https?:\/\//i.test(address)) {
    address = "https://" + address;
  }

  try {
    const parsed = new URL(address);

    if (!["https:", "http:"].includes(parsed.protocol)) {
      throw new Error("Invalid protocol");
    }

    window.open(parsed.href, "_blank", "noopener,noreferrer");
    message.textContent =
      "Opened the destination in a new tab. This is direct browsing, not proxying.";
  } catch {
    message.textContent = "Please enter a valid website address.";
  }
});
