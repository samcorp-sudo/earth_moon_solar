# Earth Explorer

Explore our home planet with an interactive globe, photographic imagery, and adjustable sunlight—all in your browser.

A Three.js experience by **[Ethan Rogers](https://x.com/ethanplusai)**, focused on Earth's continents, oceans, clouds, and night lights.

**[Explore earth.ethanplus.ai](https://earth.ethanplus.ai)** · [Run locally](#run-locally) · [Resources & credits](resources.html) · [Data & credits](CREDITS.md) · [MIT license](LICENSE)

![Interactive Earth with illuminated oceans, clouds, and terrain](docs/preview.png)

## Explore Earth

Rotate the photographic globe and zoom toward mountains and coastlines. Earth imagery, relief, clouds, atmosphere, and night lights are available in the single Earth experience.

The star field uses measured star positions. Desktop and phone layouts include labeled controls, touch interaction, and support for reduced-motion preferences.

The published site includes the Earth experience, team page, and Resources page. The legacy `/moon.html` and `/solar.html` routes redirect to Earth. Their old source files and data assets remain in the repository but are not loaded by the published experience.

## Run locally

You need **Node.js 22.12 or newer** and a modern browser with WebGL support.

```sh
git clone https://github.com/ethanplusai/earth-moon-solar.git
cd earth-moon-solar
npm ci
npm run dev
```

Open **http://localhost:5173**, or the address printed in your terminal if that port is occupied.

No accounts, API keys, or environment variables are required. All imagery and orbital data are bundled, so the running application does not need third-party requests. Installation downloads dependencies from npm.

### Controls

- **Earth:** drag to rotate and scroll or pinch to zoom.
- **On phones:** open **View controls** for globe controls. **Explore** opens Earth and source notes.

## Build and deploy

```sh
npm run build
npm run preview
```

The production website is written to `dist/`. Serve that folder at the root of a domain on a static host. Keep `index.html`, the legacy redirect pages, and the bundled assets together. The app uses root-relative asset paths; hosting under a repository subpath requires adjusting those paths.

### Deploy on Render

This repository includes a `render.yaml` Blueprint for a Render Static Site. In Render, create a new Blueprint instance and connect this repository; Render will run `npm ci && npm run build` and publish `dist/` through its CDN. No start command or server-side runtime is required.

Choose **Static Site**, not **Web Service**, if setting it up manually: build command `npm ci && npm run build`, publish directory `dist`. A Web Service configured with `npm run dev` is not a production deployment: Vite binds to `127.0.0.1`, which Render's public port scanner cannot reach. That causes repeated “No open ports detected” scans and a deploy timeout even though the build succeeded. The build log's `npm audit` notice is unrelated to that timeout.

## What the visualization represents

**Surfaces and lighting:** Earth imagery is a static composite, not live weather or observation data. Sunlight, cloud motion, terrain shading, and city brightness are adjusted for exploration.

The experience is intended for exploration and education, not navigation or precise observation. See [source credits](CREDITS.md) for imagery and asset details.

## Development

The project uses JavaScript modules, Three.js, and Vite. The published entry point is:

| File | Purpose |
| --- | --- |
| `src/main.js` | Earth views and controls |
| `src/scene.js` | Shared Earth rendering and lighting |
| `src/resources.js` | Public resources, attribution, copyright, and license page |
| `public/` | Earth imagery and retained legacy assets |

Run the unit checks with `npm test`. For browser checks, install Chromium and start the development server:

```sh
npx playwright install chromium
npm run dev
```

In another terminal:

```sh
npm run test:release
npm run test:stars
```

Tests cover Earth asset loading, legacy-route redirects, desktop and mobile controls, and star-field stability. Browser tests expect port 5173; set `TEST_URL` to use another address. Set `CHROMIUM_PATH` to select an existing Chromium executable.

Optional data preparation scripts live in `scripts/`. Python is not required to install or run the site. Contributions are welcome; include a clear description and, for visual changes, desktop and mobile screenshots.

## License and attribution

Original application code is **MIT licensed**, copyright © 2026 Ethan Rogers. You may use, modify, and redistribute it under the [MIT license](LICENSE); retain the copyright and license notice.

Third-party imagery and datasets retain their own terms. Solar System Scope textures are **CC BY 4.0**; the adapted HYG star dataset is **CC BY-SA 4.0**. The code license does not replace these asset licenses. See [CREDITS.md](CREDITS.md) for the complete attribution list and source links.
