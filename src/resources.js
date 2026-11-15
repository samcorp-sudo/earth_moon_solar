import { siteHeader } from "./site-header.js";
import "@fontsource-variable/inter";
import "@fontsource-variable/public-sans";
import "./style.css";
import "./exploration.css";
import "./resources.css";
import "./palette.css";

const app = document.querySelector("#app");

const siteImages = [
    ["Craters of the Moon, Idaho", "moon_crater.png"],
    ["Lanzarote, Spain", "Lanzarote.png"],
    ["Sudbury Basin, Canada", "sudbury.png"],
    ["Atacama Desert, Chile", "Valley_de_luna.png"],
    ["McMurdo Dry Valleys, Antarctica", "mcmurdo_Antartica_3d_map.png"],
    ["Devon Island, Canada", "devon_island_3d_map.png"],
    ["Mauna Kea and Mauna Loa, Hawaii", "Mauna_kea_circle_3dmap.png"],
    ["Rio Tinto, Spain", "calle_tinto_3dmap.png"],
    ["Mojave Desert, California", "gold_stone_3dmap.png"],
];

app.innerHTML = `
  <main class="world-shell exploration resources-page">
    ${siteHeader("resources")}
    <div class="resources-content">
      <header class="resources-hero">
        <h1>Resources &amp; <em>credits.</em></h1>
        <p>Source notes, copyright information, and license terms for the code, imagery, data, and tools used in this project.</p>
      </header>

      <section class="resources-section" aria-labelledby="project-rights-title">
        <div class="resources-section-heading">

          <h2 id="project-rights-title">Code and project rights</h2>
        </div>
        <div class="resources-card">
          <p><strong>Original application code and design:</strong> Copyright &copy; 2026 Ethan Rogers. Licensed under the <a href="https://github.com/samcorp-sudo/earth_moon_solar/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>. Redistribution of the code requires retaining its copyright and license notice.</p>
          <p><strong>Project:</strong> <a href="https://earth.ethanplus.ai" target="_blank" rel="noopener noreferrer">Earth Explorer</a> · <a href="https://github.com/samcorp-sudo/earth_moon_solar" target="_blank" rel="noopener noreferrer">Source repository</a>.</p>
          <p>The MIT license applies to the original code only. It does not grant ownership of, or replace the terms for, third-party imagery, datasets, or fonts.</p>
        </div>
      </section>

      <section class="resources-section" aria-labelledby="planetary-imagery-title">
        <div class="resources-section-heading">
       
          <h2 id="planetary-imagery-title">Planetary imagery</h2>
        </div>
        <div class="resources-card">
          <ul class="resources-list">
            <li><strong>Earth surface, relief, water, and cloud maps:</strong> NASA-derived imagery distributed through <a href="https://github.com/turban/webgl-earth" target="_blank" rel="noopener noreferrer">WebGL Earth</a>. Night-light imagery is a static NASA-derived composite distributed through <a href="https://github.com/vasturiano/three-globe/tree/master/example/img" target="_blank" rel="noopener noreferrer">three-globe</a>. Review <a href="https://www.nasa.gov/nasa-brand-center/images-and-media/" target="_blank" rel="noopener noreferrer">NASA’s media usage guidance</a>. Visual lighting and cloud motion are illustrative. No NASA endorsement is implied.</li>
            <li><strong>Moon textures:</strong> NASA Scientific Visualization Studio’s <a href="https://svs.gsfc.nasa.gov/4720" target="_blank" rel="noopener noreferrer">CGI Moon Kit</a>; credits NASA SVS / Ernie Wright, LROC / Arizona State University, and LOLA. The color map and elevation data were converted for this application. See <a href="/data/moon/README.md">preparation notes</a>.</li>

            <li><strong>Solar System textures retained in the repository:</strong> Solar System Scope / INOVE, <a href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer">texture library</a>, licensed <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Colors and rendering may be adjusted; see <a href="/data/solar/README.md">solar data and imagery notes</a>.</li>

          </ul>
        </div>
      </section>

      <section class="resources-section" aria-labelledby="field-images-title">
        <div class="resources-section-heading">
         
          <h2 id="field-images-title">Supplied analog-site pictures</h2>
        </div>
        <div class="resources-card">
          <p>The following pictures were supplied in the project’s <code>docs/docs</code> folder and are displayed with their site cards:</p>
          <ul class="resources-image-list">
            ${siteImages.map(([site, filename]) => `<li><span>${site}</span><code>${filename}</code></li>`).join("")}
          </ul>
          <p><strong>Copyright and permission:</strong> The supplied folder does not include source URLs, creator names, or license/permission records for these pictures. Copyright remains with each image’s respective rights holder. Their inclusion here does not assert that they are public domain or licensed under MIT, and does not grant permission to reuse them. Confirm and record the original source and reuse terms before redistributing these images beyond this project.</p>
        </div>
      </section>

      <section class="resources-section" aria-labelledby="data-sources-title">
        <div class="resources-section-heading">
         
          <h2 id="data-sources-title">Scientific data</h2>
        </div>
        <div class="resources-card">
          <ul class="resources-list">
            <li><strong>Planetary positions:</strong> NASA/JPL <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noopener noreferrer">Horizons System</a>. The repository includes prepared data and query details; positions are interpolated and are not a navigation product.</li>
            <li><strong>Earth observation imagery:</strong> Browse available satellite imagery using NASA <a href="https://worldview.earthdata.nasa.gov/index.html?v=-230.30028628965212,-26.037410980638832,-28.014572003937843,73.52508901936116&amp;t=2026-11-14-T02%3A37%3A51Z" target="_blank" rel="noopener noreferrer">Worldview</a>. Available layers and dates vary.</li>
            <li><strong>Planetary science archive:</strong> NASA’s <a href="https://pds.nasa.gov/" target="_blank" rel="noopener noreferrer">Planetary Data System</a> provides access to planetary mission data and archives.</li>
            <li><strong>RADARSAT Constellation Mission data:</strong> Explore the Canadian Space Agency’s <a href="https://donnees-data.asc-csa.gc.ca/en/dataset/rcm" target="_blank" rel="noopener noreferrer">RCM dataset catalogue</a> for dataset details and access information.</li>
            <li><strong>European Earth observation data:</strong> The <a href="https://dataspace.copernicus.eu/" target="_blank" rel="noopener noreferrer">Copernicus Data Space Ecosystem</a> provides access to Copernicus Earth observation data and services.</li>
            <li><strong>Star catalog:</strong> HYG Database 4.1 by David Nash / Astronomy Nexus, adapted subset licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Share adaptations under the same license. See the <a href="/data/HYG-LICENSE.md">dataset license</a>.</li>

            <li><strong>Planetary analog assessment:</strong> Site descriptions and comparison data are provided for educational exploration in connection with the <a href="https://www.spaceappschallenge.org/2026/challenges/permanent-moon-base-locations-and-mars/?tab=details" target="_blank" rel="noopener noreferrer">NASA Space Apps Challenge</a>. Similarity percentages are estimates shown as supplied; they are not validated scientific measurements or NASA findings.</li>
          </ul>
        </div>
      </section>

      <section class="resources-section" aria-labelledby="software-fonts-title">
        <div class="resources-section-heading">
         
          <h2 id="software-fonts-title">Libraries and fonts</h2>
        </div>
        <div class="resources-card">
          <ul class="resources-list">
            <li><strong>Three.js</strong> — MIT License.</li>
            <li><strong>Vite</strong> — MIT License.</li>
            <li><strong>Playwright</strong> — Apache License 2.0.</li>
            <li><strong>Inter:</strong> Copyright 2016 The Inter Project Authors. <strong>Public Sans:</strong> Copyright 2015 The Public Sans Project Authors. Both are distributed locally via Fontsource under the <a href="https://openfontlicense.org/" target="_blank" rel="noopener noreferrer">SIL Open Font License 1.1</a>. Fonts retain their authors’ copyright and license; the font license does not transfer ownership.</li>
          </ul>
          <p>Dependencies retain their own license and copyright notices in their respective package distributions.</p>
        </div>
      </section>

      <section class="resources-notice" aria-label="Rights summary">
        <h2>Respect the source terms.</h2>
        <p>Credit does not itself grant permission. Check the original source and applicable license before reusing any third-party picture or dataset. NASA identifiers and imagery must not be used to imply NASA sponsorship or endorsement.</p>
        <div class="resources-links"><a href="https://github.com/samcorp-sudo/earth_moon_solar/blob/main/CREDITS.md" target="_blank" rel="noopener noreferrer">Full repository credits <span aria-hidden="true">↗</span></a><a href="https://github.com/samcorp-sudo/earth_moon_solar/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT code license <span aria-hidden="true">↗</span></a><a href="/devs.html">Meet the team <span aria-hidden="true">↗</span></a></div>
      </section>
      <footer class="resources-footer"><span>Credits and terms · Updated 2026</span></footer>
    </div>
    <dialog class="ex-dialog">
      <button class="ex-close" aria-label="Close sources">✕</button>
      <h2>Resources and credits.</h2>
      <p>Use the Resources page for data sources, asset attribution, copyrights, and license terms.</p>
      <p><a href="/resources.html">Open resources ↗</a></p>
    </dialog>
  </main>
`;

document.querySelector("#nav-science").onclick = () =>
    document.querySelector(".ex-dialog").showModal();
document.querySelector(".ex-dialog .ex-close").onclick = () =>
    document.querySelector(".ex-dialog").close();
