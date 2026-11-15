import "./style.css";

import "./exploration.css";
import { siteHeader } from "./site-header.js";
import { createTextTransition } from "./text-transition.js";
export const $ = (s) => document.querySelector(s);
export const reduced = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;
export function shell({
  id,
  kicker,
  title,
  body,
  chapters,
  rangeLabel,
  note,
  sources,
  legend = "",
}) {
  document.querySelector("#app").innerHTML =
    `<main class="world-shell exploration ${id}"><canvas id="earth-canvas" tabindex="0" aria-label="Interactive ${id} globe. Drag to rotate; use the named controls to explore."></canvas><div class="veil"></div>${id === "planet" ? '<img class="earth-astronaut" src="/floating-astronaut.png" alt="" aria-hidden="true" draggable="false">' : ""}${siteHeader(id)}<div class="ex-status" role="status">Preparing your view…</div><section class="ex-copy"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${body}</p></section><aside class="ex-readout"><strong></strong><span></span></aside><div class="ex-extra"><button id="ex-in" aria-label="Zoom in">+</button><button id="ex-out" aria-label="Zoom out">−</button></div><aside class="ex-detail" hidden></aside><section class="ex-dock" aria-label="Exploration controls">
    <div class="ex-bottom"><span class="ex-note">${note}</span><div class="ex-legend">${legend}</div></div></section><dialog class="ex-dialog"><button class="ex-close" aria-label="Close sources">✕</button><h2>Behind the view.</h2>${sources}</dialog></main>`;
  const astronaut = $(".earth-astronaut");
  if (astronaut) {
    let pointerId = null;
    let pointerOffsetX = 0;
    let pointerOffsetY = 0;

    astronaut.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      pointerId = event.pointerId;
      const bounds = astronaut.getBoundingClientRect();
      pointerOffsetX = event.clientX - bounds.left;
      pointerOffsetY = event.clientY - bounds.top;
      astronaut.classList.add("is-dragging");
      astronaut.setPointerCapture(pointerId);
    });

    astronaut.addEventListener("pointermove", (event) => {
      if (event.pointerId !== pointerId) return;
      const bounds = astronaut.getBoundingClientRect();
      const [translateX = 0, translateY = 0] = getComputedStyle(astronaut)
        .translate.split(/\s+/)
        .map((value) => Number.parseFloat(value) || 0);
      const maxLeft = Math.max(0, innerWidth - bounds.width);
      const maxTop = Math.max(0, innerHeight - bounds.height);
      const topInset = Math.min(18, maxTop);
      const left = Math.min(
        maxLeft,
        Math.max(0, event.clientX - pointerOffsetX),
      );
      const top = Math.min(
        maxTop + translateY,
        Math.max(topInset + translateY, event.clientY - pointerOffsetY),
      );
      astronaut.style.left = `${left - translateX}px`;
      astronaut.style.top = `${top - translateY}px`;
    });

    const finishDrag = (event) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      astronaut.classList.remove("is-dragging");
    };
    astronaut.addEventListener("pointerup", finishDrag);
    astronaut.addEventListener("pointercancel", finishDrag);
    astronaut.addEventListener("lostpointercapture", finishDrag);
  }

  const transition = createTextTransition($(".ex-copy"), (v) => {
    $(".ex-copy .eyebrow").textContent = v.kicker;
    $(".ex-copy h1").innerHTML = v.title;
    $(".ex-copy p").textContent = v.body;
  });
  transition("intro", { kicker, title, body });
  $("#nav-science").onclick = () => $(".ex-dialog").showModal();
  $(".ex-dialog .ex-close").onclick = () => $(".ex-dialog").close();
  return {
    copy: (key, v) => transition(key, v),
    status: (text) => ($(".ex-status").textContent = text),
    readout: (big, small) => {
      $(".ex-readout strong").textContent = big;
      $(".ex-readout span").textContent = small;
    },
    active: (i) =>
      document
        .querySelectorAll("button[data-chapter]")
        .forEach((b, j) => b.setAttribute("aria-pressed", i === j)),
    ready: () => {
      $(".world-shell").classList.add("ready");
      $(".ex-status").textContent = "";
    },
  };
}
export function playback(onFrame) {
  let playing = false,
    last = 0;
  const button = $(".ex-play");
  function set(v) {
    playing = v;
    button.setAttribute("aria-pressed", v);
    button.textContent = v ? "Ⅱ Pause" : "▶ Play";
  }
  button.onclick = () => set(!playing);
  document.addEventListener("visibilitychange", () => (last = 0));
  function tick(t) {
    const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
    last = t;
    if (!document.hidden) onFrame(dt, playing, set);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  return set;
}
export function bindZoom(scene) {
  $("#ex-in").onclick = () => scene.zoom(0.08);
  $("#ex-out").onclick = () => scene.zoom(-0.08);
}
