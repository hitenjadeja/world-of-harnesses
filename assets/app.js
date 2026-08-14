const cards = [...document.querySelectorAll(".catalog-card")];
const grid = document.querySelector("#catalog-grid");
const searchInput = document.querySelector("#catalog-search");
const sortSelect = document.querySelector("#catalog-sort");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const loadMoreButton = document.querySelector("#load-more");
const dialog = document.querySelector("#filter-dialog");
const openFiltersButton = document.querySelector("#open-filters");
const closeFiltersButton = document.querySelector("#close-filters");
const applyFiltersButton = document.querySelector("#apply-filters");
const filterCount = document.querySelector("#mobile-filter-count");
const categoryButtons = [...document.querySelectorAll("[data-category]")];
const availabilityInputs = [...document.querySelectorAll("[data-availability]")];
const clearButtons = [...document.querySelectorAll("[data-clear-filters]")];
const pageSize = 24;

const params = new URLSearchParams(window.location.search);
const validCategories = new Set(["all", ...cards.map((card) => card.dataset.category)]);
const validAvailability = new Set(cards.map((card) => card.dataset.availability));
const validSorts = new Set(["catalog", "stars", "name"]);

const state = {
  category: validCategories.has(params.get("category")) ? params.get("category") : "all",
  availability: new Set(params.getAll("availability").filter((value) => validAvailability.has(value))),
  query: params.get("q")?.trim() || "",
  sort: validSorts.has(params.get("sort")) ? params.get("sort") : "catalog",
  visible: pageSize,
};

searchInput.value = state.query;
sortSelect.value = state.sort;

function updateControls() {
  categoryButtons.forEach((button) => {
    const active = button.dataset.category === state.category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  availabilityInputs.forEach((input) => {
    input.checked = state.availability.has(input.value);
  });

  const activeCount = (state.category === "all" ? 0 : 1) + state.availability.size;
  filterCount.textContent = String(activeCount);
  filterCount.hidden = activeCount === 0;
}

function updateUrl() {
  const nextParams = new URLSearchParams();
  if (state.query) nextParams.set("q", state.query);
  if (state.category !== "all") nextParams.set("category", state.category);
  [...state.availability].sort().forEach((value) => nextParams.append("availability", value));
  if (state.sort !== "catalog") nextParams.set("sort", state.sort);
  const query = nextParams.toString();
  window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
}

function matchingCards() {
  const terms = state.query.toLocaleLowerCase("en").split(/\s+/).filter(Boolean);
  return cards.filter((card) => {
    const categoryMatches = state.category === "all" || card.dataset.category === state.category;
    const availabilityMatches = state.availability.size === 0 || state.availability.has(card.dataset.availability);
    const searchMatches = terms.every((term) => card.dataset.search.includes(term));
    return categoryMatches && availabilityMatches && searchMatches;
  });
}

function sortedCards(matches) {
  return [...matches].sort((left, right) => {
    if (state.sort === "stars") {
      return Number(right.dataset.stars) - Number(left.dataset.stars) || left.dataset.name.localeCompare(right.dataset.name);
    }
    if (state.sort === "name") return left.dataset.name.localeCompare(right.dataset.name);
    return Number(left.dataset.index) - Number(right.dataset.index);
  });
}

function render({ updateHistory = true } = {}) {
  const matches = sortedCards(matchingCards());
  const visibleCards = new Set(matches.slice(0, state.visible));

  sortedCards(cards).forEach((card) => grid.append(card));
  matches.forEach((card) => grid.append(card));
  cards.forEach((card) => {
    card.hidden = !visibleCards.has(card);
  });

  const shown = Math.min(state.visible, matches.length);
  resultsCount.textContent = matches.length === cards.length
    ? `Showing ${shown} of ${cards.length} projects`
    : `Showing ${shown} of ${matches.length} matching projects`;
  emptyState.hidden = matches.length !== 0;
  loadMoreButton.hidden = shown >= matches.length;
  loadMoreButton.textContent = `Show ${Math.min(pageSize, matches.length - shown)} more projects ↓`;
  applyFiltersButton.textContent = matches.length === 1 ? "View 1 project" : `View ${matches.length} projects`;

  updateControls();
  if (updateHistory) updateUrl();
}

function resetVisibleAndRender() {
  state.visible = pageSize;
  render();
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    resetVisibleAndRender();

    if (button.classList.contains("filter-chip")) {
      button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  });
});

availabilityInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) state.availability.add(input.value);
    else state.availability.delete(input.value);
    resetVisibleAndRender();
  });
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value.trim();
  resetVisibleAndRender();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  render();
});

loadMoreButton.addEventListener("click", () => {
  state.visible += pageSize;
  render({ updateHistory: false });
});

clearButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.category = "all";
    state.availability.clear();
    state.query = "";
    state.sort = "catalog";
    state.visible = pageSize;
    searchInput.value = "";
    sortSelect.value = "catalog";
    render();
  });
});

openFiltersButton.addEventListener("click", () => dialog.showModal());
closeFiltersButton.addEventListener("click", () => dialog.close());
applyFiltersButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
  if (event.key === "/" && !isTyping && !dialog.open) {
    event.preventDefault();
    searchInput.focus();
  }
});

render({ updateHistory: false });
