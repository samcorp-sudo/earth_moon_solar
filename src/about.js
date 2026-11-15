import { siteHeader } from "./site-header.js";
import "@fontsource-variable/inter";
import "@fontsource-variable/public-sans";
import "./style.css";
import "./exploration.css";
import "./resources.css";
import "./palette.css";
import "./about.css";

const app = document.querySelector("#app");
const subscriptionEndpoint = import.meta.env.VITE_SUBSCRIPTION_ENDPOINT?.trim();

app.innerHTML = `
  <main class="world-shell exploration resources-page about-page">
    ${siteHeader("about")}
    <div class="resources-content about-content">
      <header class="resources-hero about-hero">
        <span class="eyebrow">A CLOSER LOOK AT OUR HOME</span>
        <h1>Earth, made <em>explorable.</em></h1>
        <p>Earth Explorer is an interactive experience for discovering our planet through a rotatable globe, NASA-derived imagery, and adjustable sunlight.</p>
      </header>

      <section class="resources-section" aria-labelledby="about-purpose-title">
        <div class="resources-section-heading">
          <h2 id="about-purpose-title">A planet to explore</h2>
        </div>
        <div class="resources-card about-card">
          <p>Move around the globe, follow coastlines and mountain ranges, and see how sunlight changes the view. Earth Explorer brings surface imagery, terrain, clouds, and night lights together in one place.</p>
          <p>The experience is designed to make it easy to look around, notice patterns, and stay curious about the world beyond your own horizon.</p>
          <div class="resources-links">
            <a href="/">Explore Earth <span aria-hidden="true">↗</span></a>
            <a href="/resources.html">View resources and credits <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section class="resources-section" aria-labelledby="about-controls-title">
        <div class="resources-section-heading">
          <h2 id="about-controls-title">Made for hands-on discovery</h2>
        </div>
        <div class="resources-card about-card">
          <ul class="resources-list">
            <li><strong>Move around:</strong> drag the globe to rotate it and scroll or pinch to zoom.</li>
            <li><strong>Explore a view:</strong> use the chapter controls to jump to selected areas and perspectives.</li>
            <li><strong>Adjust the light:</strong> change the sunlight to explore day and night across the globe.</li>
            <li><strong>On a phone:</strong> use the view controls panel for globe and chapter controls.</li>
          </ul>
        </div>
      </section>

      <section class="resources-section" aria-labelledby="about-data-title">
        <div class="resources-section-heading">
          <h2 id="about-data-title">A visualization, not a live feed</h2>
        </div>
        <div class="resources-notice about-notice">
          <p>Earth imagery and night lights are static composites, not live weather or observations. Lighting, cloud motion, terrain shading, and city brightness are adjusted for exploration. This experience is for education and discovery, not navigation or precise observation.</p>
          <div class="resources-links">
            <a href="/resources.html">Sources, imagery, and licenses <span aria-hidden="true">↗</span></a>
            <a href="/devs.html">Meet the team <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section class="resources-section" id="subscribe" aria-labelledby="about-subscribe-title">
        <div class="resources-section-heading">
          <h2 id="about-subscribe-title">Get new data updates</h2>
        </div>
        <div class="resources-card about-card">
          <p>Subscribe by email to hear when new planetary data is added. Your email will be used only for these update notices.</p>
          <form class="subscription-form" id="data-subscription-form">
            <label for="subscription-email">Email address</label>
            <div class="subscription-form-controls">
              <input id="subscription-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required${subscriptionEndpoint ? "" : " disabled"}>
              <button type="submit"${subscriptionEndpoint ? "" : " disabled"}>Subscribe</button>
            </div>
            <p class="subscription-status" id="subscription-status" role="status" aria-live="polite">${subscriptionEndpoint ? "" : "Email subscriptions are not available yet. Please check back soon."}</p>
          </form>
        </div>
      </section>

      <footer class="resources-footer"><span>Earth Explorer · Tala Voyager 3</span></footer>
    </div>
    <dialog class="ex-dialog">
      <button class="ex-close" aria-label="Close sources">✕</button>
      <h2>Sources and credits.</h2>
      <p>Learn about the imagery, data, and licenses used in Earth Explorer on the Resources page.</p>
      <p><a href="/resources.html">Open resources ↗</a></p>
    </dialog>
  </main>
`;

document.querySelector("#nav-science").onclick = () =>
  document.querySelector(".ex-dialog").showModal();
document.querySelector(".ex-dialog .ex-close").onclick = () =>
  document.querySelector(".ex-dialog").close();

const subscriptionForm = document.querySelector("#data-subscription-form");
if (subscriptionEndpoint) {
  const subscriptionStatus = document.querySelector("#subscription-status");
  subscriptionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = subscriptionForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    subscriptionStatus.textContent = "Submitting your subscription…";

    try {
      const response = await fetch(subscriptionEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: subscriptionForm.elements.email.value.trim(),
          topic: "data-updates",
        }),
      });
      if (!response.ok) throw new Error(`Subscription request failed (${response.status}).`);
      subscriptionForm.reset();
      subscriptionStatus.textContent = "Your subscription request was received. Check your email for any confirmation steps.";
    } catch (error) {
      console.error("Unable to submit email subscription.", error);
      subscriptionStatus.textContent = "We couldn’t complete your subscription. Please try again later.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
