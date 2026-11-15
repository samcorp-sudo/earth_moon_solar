import { mobileCamera, mobileOffset } from "./mobile-camera.js";
import * as THREE from "three";
import {
  registerNavigation,
  incomingJourney,
  finishArrival,
  leaveWithFrame,
  beginJourneyUI,
  journeyUI,
  prepareJourneyUI,
} from "./page-journey.js";
import {
  MOON_POSITION,
  MOON_SCALE,
  flightPose,
  moonCamera,
} from "./lunar-flight.js";
import { shell, $, playback, reduced } from "./exploration-shell.js";
import { createScene, geographic, orientation } from "./scene.js";
import {
  lunarElevationKm,
  lunarHeightPixel,
  renderEarthAnalogCards,
  surfaceCoordinates,
} from "./analog-data.js";
import "./analog.css";
import "./palette.css";
const chapters = [
  {
    kicker: "OUR CELESTIAL COMPANION",
    title: "Another world.<br> Within reach.",
    body: "Cratered plains, bright highlands, and deep shadows. Explore the surface of our nearest celestial companion.",
    lat: 12,
    lon: 0,
    zoom: 10.8,
    sun: [-3, 1.5, 4],
  },
  {
    kicker: "THE SIDE WE NEVER SEE",
    title: "Beyond the<br> familiar face.",
    body: "The Moon turns once each orbit, keeping one face toward Earth. Its far side is no darker—just much more heavily cratered.",
    lat: 5,
    lon: 180,
    zoom: 9.5,
    sun: [-3, 1, 4],
  },
  {
    kicker: "THE LUNAR SOUTH POLE",
    title: "A different<br> perspective.",
    body: "Look toward the south pole. Explore the cratered surface and change the light to reveal the shape of the terrain.",
    lat: -85,
    lon: 0,
    zoom: 7.6,
    sun: [-3, 1, 4],
  },
  {
    kicker: "LIGHT REVEALS THE LAND",
    title: "Written<br> in shadow.",
    body: "Move the sunlight. Along the terminator, low-angle light reveals crater rims and mountains. The far side has a day and night, too.",
    lat: -18,
    lon: -12,
    zoom: 8.4,
    sun: [-5, 0.7, 0.8],
  },
];
const ui = shell({
  id: "moon",
  ...chapters[0],
  chapters: ["Near side", "Far side", "South pole", "Light & shadow"],
  rangeLabel: "Sunlight",
  note: "NASA LRO imagery + LOLA terrain · Earth distance compressed for composition · Drag to orbit",
  sources: `<p>The lunar surface uses the 8K LROC color mosaic and LOLA elevation from <a href="https://svs.gsfc.nasa.gov/4720" target="_blank" rel="noopener">NASA’s CGI Moon Kit</a>. Credit: NASA’s Scientific Visualization Studio, Ernie Wright; LROC / Arizona State University and LOLA teams.</p><p>Terrain vertices are displaced at the Moon’s physical elevation scale. Fine bump shading uses the same elevation map. The display map is quantized to 8 bits across −12 to +12 km; the original unsigned TIFF encodes half-meter increments. Fine features below the texture resolution are not represented.</p><p><a href="https://science.nasa.gov/moon/facts/" target="_blank" rel="noopener">NASA Moon facts</a>: mean radius 1,737.4 km; average Earth distance about 384,400 km; synchronous rotation. The Earth backdrop uses the existing photographic Earth renderer. Relative radii are preserved, but separation and camera composition are compressed and staged. Earth is hidden when viewing the far side.</p><p>Lighting is an exploratory control, not a current phase prediction. Polar shadows are illustrative.</p>`,
  legend: "<span>1,737.4 km radius</span><span>No atmosphere</span>",
});
let idx = 0,
  targetQ = orientation(12, 0),
  viewQ = targetQ.clone(),
  distance = 10.8,
  targetDistance = 10.8,
  sunAngle = -0.95,
  shownSun = -0.95,
  nextChapterAt = 0,
  remaining = 12000,
  tourStarted = false,
  drag = null,
  ready = false;
const canvas = $("#earth-canvas");
canvas.style.visibility = "hidden";
beginJourneyUI();
const earth = createScene(canvas, { orbital: true, lunar: true });
earth.setCityLights(false);
earth.setRotation(false);
const loader = new THREE.TextureLoader();
try {
  const [map, height] = await Promise.all([
    loader.loadAsync("/textures/moon/color.jpg"),
    loader.loadAsync("/textures/moon/height.png"),
    earth.whenReady,
  ]);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  height.anisotropy = 8;
  earth.attachLayer(({ scene, group, camera, renderer }) => {
    camera.layers.enable(2);
    const lunar = new THREE.Group();
    lunar.position.copy(MOON_POSITION);
    lunar.scale.setScalar(MOON_SCALE);
    scene.add(lunar);
    const material = new THREE.MeshStandardMaterial({
      map,
      bumpMap: height,
      bumpScale: (24 / 1737.4) * 2.55,
      displacementMap: height,
      displacementScale: (24 / 1737.4) * 2.55,
      displacementBias: (-12 / 1737.4) * 2.55,
      roughness: 1,
    });
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(2.55, 384, 256),
      material,
    );
    lunar.add(moon);
    const raycaster = new THREE.Raycaster();
    raycaster.layers.enable(2);
    const sampleElevation = (latitude, longitude) => {
      const image = height.image;
      const { x, y } = lunarHeightPixel(
        latitude,
        longitude,
        image.width || image.naturalWidth,
        image.height || image.naturalHeight,
      );
      const sample = document.createElement("canvas");
      sample.width = sample.height = 1;
      const context = sample.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("Could not read the lunar elevation map");
      context.drawImage(image, x, y, 1, 1, 0, 0, 1, 1);
      return lunarElevationKm(context.getImageData(0, 0, 1, 1).data[0]);
    };
    const showLocation = (latitude, longitude, elevation) => {
      const detail = $(".ex-detail");
      detail.setAttribute("aria-live", "polite");
      detail.innerHTML = `<button class="ex-close" aria-label="Close location details">✕</button><span class="eyebrow">SELECTED LUNAR LOCATION</span><h2>${latitude.toFixed(1)}° ${latitude < 0 ? "S" : "N"}, ${Math.abs(longitude).toFixed(1)}° ${longitude < 0 ? "W" : "E"}</h2><p>Approximate elevation: ${elevation.toFixed(1)} km relative to the lunar mean-radius datum. Derived from the bundled, quantized LOLA map.</p><h3>Earth analog candidates</h3>${renderEarthAnalogCards("moon")}<p class="analog-caveat">Candidate sites are named in the linked challenge. Comparison questions are exploratory, not measured evidence or a similarity ranking. Earth cannot reproduce lunar vacuum, gravity, or radiation.</p>`;
      detail.hidden = false;
      detail.querySelector(".ex-close").onclick = () => (detail.hidden = true);
    };
    let press = null;
    canvas.addEventListener("pointerdown", (event) => {
      press = { x: event.clientX, y: event.clientY };
    });
    canvas.addEventListener("pointerup", (event) => {
      if (
        !press ||
        !ready ||
        depart ||
        Math.hypot(event.clientX - press.x, event.clientY - press.y) > 6
      ) {
        press = null;
        return;
      }
      press = null;
      const rect = canvas.getBoundingClientRect();
      const pointer = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObject(moon, false)[0];
      if (!hit) return;
      const location = surfaceCoordinates(lunar.worldToLocal(hit.point.clone()));
      showLocation(
        location.latitude,
        location.longitude,
        sampleElevation(location.latitude, location.longitude),
      );
    });
    canvas.addEventListener("pointercancel", () => (press = null));
    // This staged lunar view supplies its own sunlight; the shared Earth assets are retained.
    const light = new THREE.DirectionalLight(0xfff4e6, 3.4);
    light.layers.set(2);
    scene.add(light);
    const fill = new THREE.AmbientLight(0xb6c8df, 0.08);
    fill.layers.set(2);
    scene.add(fill);
    lunar.traverse((object) => object.layers.set(2));
    renderer.initTexture(map);
    renderer.initTexture(height);
    ui.ready();
    canvas.style.visibility = "visible";
    let flightStart = null,
      flightScheduled = false,
      depart = null,
      departFrom = null,
      departAim = null,
      departQ = null,
      departOffset = 0;
    const earthQ = incomingJourney?.pose
      ? new THREE.Quaternion().fromArray(incomingJourney.pose.quaternion)
      : orientation(17, 77);
    group.quaternion.copy(earthQ);
    group.position.set(0, 0, 0);
    group.scale.setScalar(1);
    registerNavigation(async (url, prepared) => {
      prepared();
      setPlay(false);
      beginJourneyUI(true);
      depart = {
        url,
        start: performance.now(),
        solar: new URL(url).pathname === "/solar.html",
      };
      departFrom = camera.position.clone();
      departAim = camera
        .getWorldDirection(new THREE.Vector3())
        .multiplyScalar(camera.position.distanceTo(MOON_POSITION))
        .add(camera.position);
      departOffset = camera.view?.enabled ? camera.view.offsetY : 0;
      departQ = viewQ.clone();
    });
    return {
      update(t, dt) {
        const ease = reduced() ? 1 : 1 - Math.exp(-dt * 2.4);
        viewQ.slerp(targetQ, ease);
        lunar.quaternion.copy(viewQ);
        distance += (targetDistance - distance) * ease;
        const narrow = innerWidth < 760;
        if (!flightScheduled) {
          flightScheduled = true;
          prepareJourneyUI();
          requestAnimationFrame(() => {
            flightStart = performance.now();
            finishArrival();
          });
        }
        const p = reduced()
          ? 1
          : flightStart === null
            ? 0
            : THREE.MathUtils.clamp((t - flightStart) / 1650, 0, 1);
        const arrivalPose = incomingJourney?.pose;
        group.position
          .fromArray(arrivalPose?.position || [0, 0, 0])
          .multiplyScalar(1 - THREE.MathUtils.smoothstep(p, 0, 0.55));
        group.scale.setScalar(1);
        group.quaternion.copy(earthQ);
        group.visible = true;
        const mobileDistance = mobileCamera(camera, {
            radius: 2.55 * MOON_SCALE,
            zoom: 0,
          }),
          endOffset = camera.view?.enabled ? camera.view.offsetY : 0;
        const endCamera =
          mobileDistance === null
            ? moonCamera(distance, narrow)
            : MOON_POSITION.clone().add(
                new THREE.Vector3(0, 0, (mobileDistance * distance) / 10.8),
              );
        const endAim =
          mobileDistance === null
            ? MOON_POSITION.clone().add(
                new THREE.Vector3(
                  narrow ? 0 : -1.15 * MOON_SCALE,
                  narrow ? -1.25 * MOON_SCALE : -0.15 * MOON_SCALE,
                  0,
                ),
              )
            : MOON_POSITION.clone();
        if (depart) {
          const elapsed = reduced()
            ? 1
            : THREE.MathUtils.clamp(
                (t - depart.start) / (depart.solar ? 160 : 1450),
                0,
                1,
              );
          journeyUI(
            1 - THREE.MathUtils.smoothstep((t - depart.start) / 180, 0, 1),
          );
          const pose = depart.solar
            ? { camera: departFrom, aim: departAim }
            : flightPose(elapsed, narrow, 10.8, {
                from: departFrom,
                to: new THREE.Vector3(0, 0, narrow ? 17.325 : 10.5),
                fromAim: departAim,
                toAim: new THREE.Vector3(),
              });
          mobileOffset(
            camera,
            departOffset *
              (depart.solar
                ? 1
                : 1 - THREE.MathUtils.smoothstep(elapsed, 0, 1)),
          );
          camera.position.copy(pose.camera);
          camera.lookAt(pose.aim);
          lunar.quaternion.copy(departQ);
          if (elapsed === 1) {
            earth.setFrameDriver(() => {});
            leaveWithFrame(depart.url, renderer, scene, camera, {
              position: [0, 0, 0],
              quaternion: earthQ.toArray(),
              camera: camera.position.toArray(),
              offset: depart.solar ? departOffset : 0,
              ...(depart.solar
                ? {
                    aim: departAim.toArray(),
                    moon: {
                      position: MOON_POSITION.toArray(),
                      quaternion: lunar.quaternion.toArray(),
                      sun: [Math.sin(shownSun), 0.3, Math.cos(shownSun)],
                    },
                  }
                : {}),
            });
          }
        } else if (p < 1) {
          journeyUI(THREE.MathUtils.smootherstep((p - 0.55) / 0.45, 0, 1));
          const pose = flightPose(p, narrow, distance, {
            from: arrivalPose
              ? new THREE.Vector3().fromArray(arrivalPose.camera)
              : undefined,
            to: endCamera,
            toAim: endAim,
          });
          mobileOffset(
            camera,
            THREE.MathUtils.lerp(
              arrivalPose?.offset || 0,
              endOffset,
              THREE.MathUtils.smoothstep(p, 0, 1),
            ),
          );
          camera.position.copy(pose.camera);
          camera.lookAt(pose.aim);
        } else {
          if (!ready) {
            ready = true;
            journeyUI(1, true);
          }
          camera.position.copy(endCamera);
          camera.lookAt(endAim);
          group.visible = idx !== 1;
        }
        if (!depart && p < 1 && arrivalPose?.offsetX)
          camera.setViewOffset(
            innerWidth,
            innerHeight,
            arrivalPose.offsetX * (1 - THREE.MathUtils.smoothstep(p, 0, 1)),
            camera.view?.offsetY || 0,
            innerWidth,
            innerHeight,
          );
        camera.updateMatrixWorld();
        shownSun +=
          Math.atan2(
            Math.sin(sunAngle - shownSun),
            Math.cos(sunAngle - shownSun),
          ) * ease;
        light.position
          .copy(MOON_POSITION)
          .add(
            new THREE.Vector3(
              Math.sin(shownSun) * 10,
              3,
              Math.cos(shownSun) * 10,
            ),
          );
        light.target.position.copy(MOON_POSITION);
        light.target.updateMatrixWorld();
        canvas.dataset.journeyProgress = p.toFixed(4);
        canvas.dataset.moonReady = "true";
        canvas.dataset.moonChapter = idx;
        canvas.dataset.cameraDistance = distance.toFixed(3);
      },
    };
  });
} catch (e) {
  journeyUI(1, true);
  finishArrival();
  ui.status("The lunar maps could not load. Reload to try again.");
  console.error(e);
}
function chapter(i) {
  idx = i;
  const c = chapters[i];
  targetQ.copy(orientation(c.lat, c.lon));
  targetDistance = c.zoom;
  sunAngle = i === 3 ? -1.35 : -0.95;
  $("#ex-range").value = (sunAngle + Math.PI) / (2 * Math.PI);
  ui.active(i);
  ui.copy(String(i), c);
  ui.readout(
    i === 1 ? "The far side" : i === 2 ? "90° south" : "384,400 km",
    i === 1
      ? "ANOTHER HEMISPHERE"
      : i === 2
        ? "A VIEW TOWARD THE POLE"
        : "AVERAGE DISTANCE FROM EARTH",
  );
}

document.querySelectorAll("[data-chapter]").forEach(
  (b) =>
    (b.onclick = () => {
      setPlay(false);
      tourStarted = false;
      remaining = 12000;
      chapter(+b.dataset.chapter);
    }),
);
// Start with a visible camera move; chapter dwell time must not depend on render FPS.
const setPlayback = playback((dt, playing) => {
  if (playing && ready && performance.now() >= nextChapterAt) {
    chapter((idx + 1) % chapters.length);
    remaining = 12000;
    nextChapterAt = performance.now() + remaining;
  }
});
function setPlay(playing) {
  if (playing) {
    if (!tourStarted) {
      chapter((idx + 1) % chapters.length);
      tourStarted = true;
    }
    nextChapterAt = performance.now() + remaining;
  } else if ($(".ex-play").getAttribute("aria-pressed") === "true") {
    remaining = Math.max(0, nextChapterAt - performance.now());
  }
  setPlayback(playing);
}
$(".ex-play").onclick = () =>
  setPlay($(".ex-play").getAttribute("aria-pressed") !== "true");
document.addEventListener("visibilitychange", () => {
  if (document.hidden) setPlay(false);
});
$("#ex-range").oninput = (e) => {
  sunAngle = +e.target.value * Math.PI * 2 - Math.PI;
  setPlay(false);
};
$("#ex-in").onclick = () =>
  (targetDistance = Math.max(5.2, targetDistance - 0.8));
$("#ex-out").onclick = () =>
  (targetDistance = Math.min(16, targetDistance + 0.8));
canvas.addEventListener("pointerdown", (e) => {
  drag = { x: e.clientX, y: e.clientY };
  setPlay(false);
});
canvas.addEventListener("pointermove", (e) => {
  if (!drag) return;
  targetQ.premultiply(
    new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        (e.clientY - drag.y) * 0.004,
        (e.clientX - drag.x) * 0.004,
        0,
      ),
    ),
  );
  drag = { x: e.clientX, y: e.clientY };
});
for (const event of ["pointerup", "pointercancel"])
  canvas.addEventListener(event, () => (drag = null));
chapter(0);

let pinchDistance = null;
canvas.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length === 2) {
      drag = null;
      pinchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      setPlay(false);
    }
  },
  { passive: true },
);
canvas.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length === 2 && pinchDistance) {
      drag = null;
      const next = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      targetDistance = THREE.MathUtils.clamp(
        (targetDistance * pinchDistance) / Math.max(next, 1),
        5.2,
        16,
      );
      pinchDistance = next;
    }
  },
  { passive: true },
);
for (const event of ["touchend", "touchcancel"])
  canvas.addEventListener(event, () => (pinchDistance = null), {
    passive: true,
  });

canvas.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    targetDistance = THREE.MathUtils.clamp(
      targetDistance * Math.exp(e.deltaY * 0.001),
      5.2,
      16,
    );
    setPlay(false);
  },
  { passive: false },
);
