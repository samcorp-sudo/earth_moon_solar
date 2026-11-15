import { mobileLayout } from "./mobile-layout.js";
import "./site-header.css";
import { arrowUpRight } from "./ui-icons.js";
const links = [
  ["planet", "/", "Earth"],
  ["about", "/about.html", "About"],
  ["resources", "/resources.html", "Resources"],
  ["devs", "/devs.html", "Devs"],
];
const creator = `<a class="creator-link" href="https://x.com/ethanplusai" target="_blank" rel="noopener noreferrer"><strong></strong></a>`;
function setupPageSearch() {
  const input = document.querySelector("#page-search");
  const results = document.querySelector("#page-search-results");
  const status = document.querySelector("#page-search-status");
  const container = document.querySelector(".header-search");
  let highlighted = null;
  let highlightTimer;
  let shownCount = 8;
  let lastQuery = "";

  function closeResults() {
    results.hidden = true;
    input.setAttribute("aria-expanded", "false");
  }

  function renderResults() {
    const query = input.value.trim().toLocaleLowerCase();
    if (query !== lastQuery) {
      lastQuery = query;
      shownCount = 8;
    }
    results.replaceChildren();
    if (query.length < 2) {
      status.textContent = "";
      closeResults();
      return;
    }

    const matches = [...document.querySelectorAll(
      ".world-shell :is(h1, h2, h3, p, li, button, dt, dd, figcaption)",
    )].filter((element) => {
      if (element.closest(".global-header, dialog, [hidden], [aria-hidden='true']")) return false;
      if (!element.getClientRects().length) return false;
      return element.textContent.trim().toLocaleLowerCase().includes(query);
    });

    const visibleCount = Math.min(shownCount, matches.length);
    status.textContent = matches.length
      ? visibleCount < matches.length
        ? `Showing ${visibleCount} of ${matches.length} matches`
        : `${matches.length} ${matches.length === 1 ? "match" : "matches"}`
      : "No matching text on this page";

    matches.slice(0, shownCount).forEach((element, index) => {
      const text = element.textContent.replace(/\s+/g, " ").trim();
      const position = text.toLocaleLowerCase().indexOf(query);
      const start = Math.max(0, position - 28);
      const excerpt = `${start ? "..." : ""}${text.slice(start, start + 105)}${start + 105 < text.length ? "..." : ""}`;
      const section = element.closest("section, article, aside");
      const heading = section?.querySelector("h1, h2, h3")?.textContent.trim();
      const option = document.createElement("button");
      option.type = "button";
      option.className = "page-search-result";
      option.id = `page-search-option-${index}`;
      option.setAttribute("role", "option");
      const excerptNode = document.createElement("span");
      excerptNode.textContent = excerpt;
      option.append(excerptNode);
      if (heading && heading !== text) {
        const headingNode = document.createElement("small");
        headingNode.textContent = heading;
        option.append(headingNode);
      }
      option.addEventListener("click", () => {
        if (highlighted) highlighted.classList.remove("page-search-highlight");
        clearTimeout(highlightTimer);
        highlighted = element;
        highlighted.classList.add("page-search-highlight");
        closeResults();
        element.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "center",
        });
        document.dispatchEvent(new CustomEvent("earth-search-result", { detail: { element } }));
        highlightTimer = setTimeout(() => {
          element.classList.remove("page-search-highlight");
          highlighted = null;
        }, 2200);
      });
      results.append(option);
    });

    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "page-search-empty";
      empty.textContent = "Try another search term.";
      results.append(empty);
    } else if (visibleCount < matches.length) {
      const more = document.createElement("button");
      more.type = "button";
      more.className = "page-search-more";
      more.textContent = `Show ${Math.min(8, matches.length - visibleCount)} more`;
      more.addEventListener("click", () => {
        shownCount += 8;
        renderResults();
      });
      results.append(more);
    }
    results.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  input.addEventListener("input", renderResults);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeResults();
    } else if (event.key === "ArrowDown") {
      results.querySelector("button")?.focus();
      event.preventDefault();
    }
  });
  results.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeResults();
      input.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!container.contains(event.target)) closeResults();
  });
}

export function siteHeader(current) {
  queueMicrotask(() => {
    mobileLayout(current);
    setupPageSearch();
    const menu = document.querySelector("#mobile-navigation"),
      toggle = document.querySelector("#menu-toggle");
    toggle.onclick = () => {
      menu.showModal();
      toggle.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.close();
    };
    menu.addEventListener("cancel", () =>
      toggle.setAttribute("aria-expanded", "false"),
    );
    menu.querySelector("button").onclick = close;
    menu.addEventListener("close", () =>
      toggle.setAttribute("aria-expanded", "false"),
    );
    menu.addEventListener("click", (e) => {
      if (e.target === menu) close();
    });
    menu.querySelector("#mobile-menu-sources").onclick = () => {
      close();
      document.querySelector("#nav-science").click();
    };
    menu
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", close));
  });
  const items = links
    .map(
      ([id, href, label]) =>
        `<a href="${href}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");
  return `<header class="site-header global-header"><a class="wordmark" href="/" aria-label="Earth home">Terra Sync<span class="wordmark-period">.</span></a><nav class="desktop-navigation" aria-label="Primary navigation">${items}</nav><div class="header-actions"><div class="header-search" role="search"><label class="visually-hidden" for="page-search">Search this page</label><input id="page-search" type="search" placeholder="Search this page" autocomplete="off" aria-controls="page-search-results" aria-expanded="false" aria-autocomplete="list"><div id="page-search-status" class="page-search-status" role="status" aria-live="polite"></div><div id="page-search-results" class="page-search-results" role="listbox" aria-label="Page search results" hidden></div></div><div class="desktop-creator">${creator}</div><button id="nav-science" class="header-sources">Sources ${arrowUpRight}</button><button id="menu-toggle" aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded="false">Explore <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 13h14"/></svg></button></div></header><dialog id="mobile-navigation" aria-label="Explore Earth"><div class="mobile-menu-heading"><span>EXPLORE EARTH</span><button aria-label="Close navigation">?</button></div><nav aria-label="Earth page">${items}</nav><div class="mobile-menu-footer"><button id="mobile-menu-sources" aria-haspopup="dialog">Sources ${arrowUpRight}</button></div></dialog>`;
}
