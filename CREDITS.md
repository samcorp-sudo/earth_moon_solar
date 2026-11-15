# Credits and asset terms

Original application code: © 2026 [Ethan Rogers](https://x.com/ethanplusai), MIT. Original project: [earth.ethanplus.ai](https://earth.ethanplus.ai).

The code license does not replace the following asset terms. Preserve these credits and linked licenses when redistributing the corresponding files. No endorsement by NASA, JPL, or the other source organizations is implied.

| Assets | Attribution and source | Terms and transformations |
| --- | --- | --- |
| Earth surface, relief, water and cloud maps | NASA-derived imagery distributed through [WebGL Earth](https://github.com/turban/webgl-earth) | [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/). Static maps; displayed shading and cloud motion are illustrative. |
| Earth night map | NASA-derived composite distributed through [three-globe](https://github.com/vasturiano/three-globe/tree/master/example/img) | Preserve NASA attribution. Static composite, with brightness and color adjusted in the renderer. |
| `public/textures/moon/` | [NASA CGI Moon Kit](https://svs.gsfc.nasa.gov/4720): NASA SVS / Ernie Wright; LROC / Arizona State University; LOLA | Color converted to JPEG; elevation converted and quantized. [Preparation details](public/data/moon/README.md). Follow [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/); no NASA endorsement is implied. |
| `public/textures/solar/` | [Solar System Scope / INOVE](https://www.solarsystemscope.com/textures/) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Bundled texture pixels are unmodified; rendering changes exposure and lighting. Provider maps adjust colors and fill some unmapped regions with illustrative terrain. |
| `public/analog-sites/` | Pictures supplied in the project’s `docs/docs` folder; filenames are listed on the [Resources page](resources.html) | The supplied folder contained no source URLs, creator names, or license/permission records. Copyright remains with the respective rights holders. No public-domain status or reuse license is claimed; verify permission before redistribution. |
| `public/data/solar/*.json` | [NASA/JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) | Prepared state-vector subset with source queries and hashes. [Coverage, preparation, and limitations](public/data/solar/README.md). |
| `public/data/stars.json` | David Nash / Astronomy Nexus, [HYG Database 4.1](https://github.com/astronexus/HYG-Database) | Adapted subset: magnitude ≤ 6.5, selected fields and rounded coordinates. [CC BY-SA 4.0](public/data/HYG-LICENSE.md). Share adaptations of this dataset under that license. |
| Inter font files | Copyright 2016 The Inter Project Authors; distributed via [Fontsource](https://fontsource.org/) | [SIL Open Font License 1.1](https://openfontlicense.org/); bundled package includes the license. |
| Public Sans font files | Copyright 2015 The Public Sans Project Authors; distributed via [Fontsource](https://fontsource.org/) | [SIL Open Font License 1.1](https://openfontlicense.org/); bundled package includes the license. |

Original application code is Copyright © 2026 Ethan Rogers, under the MIT License in [LICENSE](LICENSE). Third-party libraries retain the notices shipped with their packages: Three.js and Vite (MIT); Playwright (Apache-2.0). Third-party asset terms are separate from the code license. See the [Resources page](resources.html) for the public-facing rights summary.
