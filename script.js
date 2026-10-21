
const address = document.getElementById("address");
const message = document.getElementById("message");
const viewer = document.getElementById("viewer");

const destinations = {
  roblox: "https://www.roblox.com/",
  nowgg: "https://now.gg/",
  whatsup: "https://whatsup.ai/"
};

document.querySelectorAll("[data-site]").forEach(button => {
  button.addEventListener("click", () => {
    const site = button.dataset.site;
    address.value = destinations[site];
    message.textContent =
      "Selected " + site + ". A compatible, authorized proxy backend is required to load it here.";
  });
});

document.getElementById("go").addEventListener("click", () => {
  let url;

  try {
    url = new URL(address.value);
  } catch {
    message.textContent = "Enter a valid HTTPS address.";
    return;
  }

  if (url.protocol !== "https:") {
    message.textContent = "Only HTTPS destinations are supported.";
    return;
  }

  message.textContent =
    "Destination selected: " + url.hostname +
    ". This starter does not relay website traffic yet.";
});

document.getElementById("home").addEventListener("click", () => {
  address.value = "";
  message.textContent = "Choose a destination to get started.";
});

document.getElementById("back").addEventListener("click", () => {
  message.textContent =
    "Navigation history requires an active browsing backend.";
});

document.getElementById("refresh").addEventListener("click", () => {
  message.textContent =
    "Refresh is available after a compatible browsing backend is connected.";
});
