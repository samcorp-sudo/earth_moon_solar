import { siteHeader } from "./site-header.js";
import "@fontsource-variable/inter";
import "@fontsource-variable/public-sans";
import "./style.css";
import "./exploration.css";
import "./devs.css";

const app = document.querySelector("#app");

// First person in the list is the lead and sits at the top of the tree.
const team = [
    { name: "Jacken James B. Bongao", role: " Team Leader & Developer", initials: "JB" },
    { name: "Angelito Nicolas Jr.", role: "Data Analyst & Researcher", initials: "AN" },
    { name: "Matt David Abing", role: "Tech Support & Researcher", initials: "MA" },
    { name: "First Emman Roxas", role: "UI & UX Artist & Presenter", initials: "FR" },
    { name: "Shedrick Ross Oclarit", role: "Creative Ideator & Project Manager", initials: "O" },
];

const [lead, ...members] = team;

const memberCard = ({ name, role, initials }, extraClass = "") => `
  <div class="devs-profile devs-member ${extraClass}">
    <div class="devs-profile-top"><span>${(role || "Role coming soon").toUpperCase()}</span><span class="devs-status"><i></i> JS DEVS</span></div>
    <div class="devs-monogram" aria-hidden="true">${initials}</div>
    <h2>${name}</h2>
    <p>${role || "Team member"}</p>
  </div>
`;

app.innerHTML = `
  <main class="world-shell exploration devs-page">
    <div class="devs-atmosphere" aria-hidden="true"><span></span><span></span></div>
    ${siteHeader("devs")}
    <div class="devs-content">
      <section class="devs-hero" aria-labelledby="devs-title">
        <div class="devs-intro">

          <h1 id="devs-title">Built with curiosity.<br /><em>Made to explore.</em></h1>
          <p>Earth Explorer is an interactive project by the JS Devs team, bringing together planetary imagery and hands-on web graphics.</p>

        </div>
      </section>

      <section class="devs-section" aria-labelledby="devs-team-title">
        <div class="devs-section-heading">
          
          <h2 id="devs-team-title">Tala Voyager 3</h2>
        </div>

        <ul class="devs-tree" aria-label="JS Devs team">
          <li class="devs-node devs-node-lead">
      
            <ul class="devs-branch">
              ${members.map((member) => `<li class="devs-node">${memberCard(member)}</li>`).join("")}
            </ul>
          </li>
        </ul>
      </section>

      <section class="devs-section" aria-labelledby="devs-build-title">
        <div class="devs-section-heading">
          
    
        </div>

      </section>

     
  </main>
`;

document.querySelector("#nav-science").onclick = () =>
    document.querySelector(".ex-dialog").showModal();
document.querySelector(".ex-dialog .ex-close").onclick = () =>
    document.querySelector(".ex-dialog").close();

const devsPage = document.querySelector(".devs-page");
let scrollbarTimer;
devsPage.addEventListener(
    "scroll",
    () => {
        devsPage.classList.add("is-scrolling");
        clearTimeout(scrollbarTimer);
        scrollbarTimer = setTimeout(() => {
            devsPage.classList.remove("is-scrolling");
        }, 800);
    },
    { passive: true },
);
