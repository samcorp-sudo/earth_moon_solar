export const ANALOG_SOURCE =
    "https://www.spaceappschallenge.org/2026/challenges/permanent-moon-base-locations-and-mars/?tab=details";

export const ANALOG_DOCUMENT = {
    title: "Planetary Analog Environments: Earth, Moon & Mars Assessment",
    subtitle:
        "Site-by-Site Evaluation of Geophysical Factors, Coordinates, Operational Goals, Limitations & Primary Sources",
};

/* ------------------------------------------------------------------ */
/* CORE ANALYTICAL FRAMEWORK (EVALUATION GOALS)                        */
/* ------------------------------------------------------------------ */
export const EVALUATION_GOALS = [
    {
        id: 1,
        title: "Where the Analogy Works",
        text:
            "Identifies the exact geological, mineralogical, climatic, and environmental properties (including permafrost, dust/aerosols, volcanic terrains, lava tubes, caves, and water ice) that closely replicate Lunar or Martian targets.",
    },
    {
        id: 2,
        title: "How It Will Work (Science & Exploration Utility)",
        text:
            "Explains how field testing, robotics, mobility, navigation, landing, construction, In-Situ Resource Utilization (ISRU), and human operations execute science and engineering validation at each site.",
    },
    {
        id: 3,
        title: "Where It Breaks Down & Doesn't Work",
        text:
            "Defines the physical, atmospheric, gravitational, radiative, and biological boundaries where Earth conditions diverge from extraterrestrial reality.",
    },
];

/* ------------------------------------------------------------------ */
/* Section 1 & 2: Earth analog sites (full PDF text)                   */
/* ------------------------------------------------------------------ */
export const EARTH_ANALOG_SITES = [
    /* ---------------- Section 1: Lunar Analog Sites on Earth ---------------- */
    {
        number: 1,
        section: "Section 1: Lunar Analog Sites on Earth",
        analogType: "LUNAR ANALOG",
        name: "Craters of the Moon National Monument, Idaho, USA",
        shortName: "Craters of the Moon, Idaho",
        region: "Idaho, United States",
        image: "/analog-sites/moon_crater.png",
        similarityRate: "52–54%",
        latitude: 43.4167,
        longitude: -113.5167,
        earthCoordinates: "43.4167° N, 113.5167° W",
        target: "Marius Hills Skylight & Lava Tubes (14.09° N, 56.77° W)",
        targetBody: "Moon",
        keyFactors: "Volcanic terrains, lava tubes, caves, mobility, navigation, human operations, construction",
        works:
            "Features young, unweathered basaltic lava flows, cinder cones, spatter cones, and intact subsurface lava tubes/caves morphologically identical to lunar mare rilles and skylight pits.",
        howItWorks:
            "Enables testing of subterranean cave-mapping LiDAR, autonomous rover mobility over jagged lava blocks, non-GPS navigation inside dark lava tubes, and evaluating subsurface shelter construction against radiation.",
        limits:
            "Earth's 1g gravity limits the maximum stable span of terrestrial lava tubes (~30 m wide) compared to the Moon's 1/6g (which supports massive caves hundreds of meters wide). Atmospheric air pressure, moisture, and biological growth inside caves do not match the lunar vacuum.",
        sources:
            "NASA FINESSE (Field Investigations to Enable Solar System Science and Exploration); USGS Astrogeology Science Center; JAXA SELENE/Kaguya Lunar Lava Tube Observations.",
    },
    {
        number: 2,
        section: "Section 1: Lunar Analog Sites on Earth",
        analogType: "LUNAR ANALOG",
        name: "Lanzarote, Canary Islands, Spain",
        shortName: "Lanzarote, Canary Islands",
        region: "Canary Islands, Spain",
        image: "/analog-sites/Lanzarote.png",
        similarityRate: "56–60%",
        latitude: 29.0469,
        longitude: -13.5899,
        earthCoordinates: "29.0469° N, 13.5899° W",
        target: "Oceanus Procellarum & Mare Tranquillitatis (8.50° N, 31.40° E)",
        targetBody: "Moon",
        keyFactors: "Similar geology/minerals, volcanic terrains, lava tubes, caves, human operations, ISRU, construction",
        works:
            "Arid basaltic volcanic fields, pyroclastic ash deposits, and extensive volcanic cave systems (such as Cueva de los Verdes) replicate lunar mare basalt mineralogy and minimal vegetation cover.",
        howItWorks:
            "Used by the European Space Agency (ESA) PANGAEA campaign to train astronauts in field geology, sample collection, 3D-printing habitats using crushed basaltic regolith simulants (ISRU), and human EVA workflows.",
        limits:
            "Lack of sharp, electrostatically charged agglutinates formed by micrometeorite bombardment on the Moon; marine humidity, wind erosion, and Earth gravity alter dust behavior and regolith mechanics.",
        sources:
            "European Space Agency (ESA) PANGAEA & CAVES Training Campaigns; Instituto de Geociencias (IGEO-CSIC), Spain.",
    },
    {
        number: 3,
        section: "Section 1: Lunar Analog Sites on Earth",
        analogType: "LUNAR ANALOG",
        name: "Sudbury Basin, Ontario, Canada",
        shortName: "Sudbury Basin, Ontario",
        region: "Ontario, Canada",
        image: "/analog-sites/sudbury.png",
        similarityRate: "41–45%",
        latitude: 46.6,
        longitude: -81.1833,
        earthCoordinates: "46.6000° N, 81.1833° W",
        target: "Tycho Crater & Lunar Highlands (43.31° S, 11.36° W)",
        targetBody: "Moon",
        keyFactors: "Similar geology/minerals, human operations, navigation",
        works:
            "Preserves a 1.85-billion-year-old multi-ring impact structure containing shatter cones, impact breccias, and impact melt sheets analogous to lunar highland craters.",
        howItWorks:
            "Trains Artemis astronauts and planetary geologists to identify shock-metamorphosed rocks, map crater ejecta blankets, and select high-priority samples for lunar sample return.",
        limits:
            "Billions of years of terrestrial plate tectonics, glaciation, forest cover, and hydrological erosion have deformed and masked the original circular crater rim, unlike pristine airless lunar craters.",
        sources:
            "NASA Johnson Space Center (JSC) Astronaut Geology Training; Canadian Space Agency (CSA); Lunar and Planetary Institute (LPI).",
    },

    /* ---------------- Section 2: Martian Analog Sites on Earth ---------------- */
    {
        number: 4,
        section: "Section 2: Martian Analog Sites on Earth",
        analogType: "MARS ANALOG",
        name: "Atacama Desert (Yungay Region), Chile",
        shortName: "Atacama Desert, Chile",
        region: "Yungay region, Chile",
        image: "/analog-sites/Valley_de_luna.png",
        latitude: -24.0833,
        longitude: -69.9167,
        earthCoordinates: "24.0833° S, 69.9167° W",
        target: "Jezero Crater (18.38° N, 77.58° E) & Oxia Planum (18.28° N, 335.37° E)",
        targetBody: "Mars",
        keyFactors: "Similar geology/minerals, dust storms, aerosols, robotics, mobility, human operations",
        works:
            "Hyper-arid soils rich in perchlorates, nitrates, sulfates, and iron oxides closely match Martian regolith chemistry; suspended fine mineral dust models atmospheric aerosols.",
        howItWorks:
            "Validates subsurface life-detection drills (such as ESA's ExoMars Rosalind Franklin rover), autonomous rover mobility over gravel-strewn plains, and optical dust/aerosol sensors.",
        limits:
            "Atmospheric pressure (~1,000 mbar vs. Mars's ~6 mbar) allows liquid fog moisture (camanchaca) and supports trace endolithic microbes; lacks global-scale electrostatic Martian dust storms and intense UV/ionizing radiation.",
        sources:
            "NASA Ames Research Center (ARADS — Atacama Rover Astrobiology Drilling Studies); ESA ExoMars Field Testing; Centro de Astrobiología (CAB).",
    },
    {
        number: 5,
        section: "Section 2: Martian Analog Sites on Earth",
        analogType: "MARS ANALOG",
        name: "McMurdo Dry Valleys, Antarctica",
        shortName: "McMurdo Dry Valleys, Antarctica",
        region: "Antarctica",
        image: "/analog-sites/mcmurdo_Antartica_3d_map.png",
        latitude: -77.4667,
        longitude: 162.5167,
        earthCoordinates: "77.4667° S, 162.5167° E",
        target: "Vastitas Borealis / Phoenix Landing Site (68.22° N, 234.25° E)",
        targetBody: "Mars",
        keyFactors: "Permafrost, low temperature, water ice, robotics, human operations",
        works:
            "Ground remains continuously at or below 0°C for thousands of years (true permafrost) with ice-cemented soil, sublimation-dominated hydrology, and hyper-cold katabatic winds mirroring Martian polar plains.",
        howItWorks:
            "Tests cryogenic rotary-percussive ice drills for water-ice extraction (ISRU), validates Phoenix/Viking-style soil scoops, and studies crew psychological isolation at nearby Antarctic stations.",
        limits:
            "Temperatures (-20°C to -50°C) are still warmer than Martian winter extremes (-125°C); Earth's nitrogen-oxygen atmosphere prevents CO₂ dry-ice frost deposition and alters ice sublimation rates.",
        sources:
            "National Science Foundation (NSF) McMurdo Dry Valleys LTER; NASA Phoenix Mars Scout Analog Studies; ESA Concordia Station Biomedical Research.",
    },
    {
        number: 6,
        section: "Section 2: Martian Analog Sites on Earth",
        analogType: "MARS ANALOG",
        name: "Devon Island (Haughton Crater), Nunavut, Canada",
        shortName: "Devon Island, Canada",
        region: "Haughton Crater, Nunavut, Canada",
        image: "/analog-sites/devon_island_3d_map.png",
        latitude: 75.375,
        longitude: -89.6833,
        earthCoordinates: "75.3750° N, 89.6833° W",
        target: "Gale Crater (5.40° S, 137.80° E) & Polar Impact Basins",
        targetBody: "Mars",
        keyFactors:
            "Permafrost, low temperature, water ice, similar geology, robotics, mobility, navigation, human operations",
        works:
            "A 23-km-wide impact crater embedded in Arctic permafrost with paleolake sediments, gully networks, and ground ice analogous to ancient Martian crater lakes.",
        howItWorks:
            "Serves as a full-scale operational proving ground (Haughton-Mars Project) for spacesuit EVA mobility, unpressurized rover navigation, tele-robotics, and time-delayed Earth-Mars mission communications.",
        limits:
            "Brief Arctic summer melt creates liquid runoff streams and active tundra biology; Earth's breathable air eliminates life-support pressure differentials inside spacesuits.",
        sources:
            "NASA Haughton-Mars Project (HMP); Mars Institute; SETI Institute; Canadian Space Agency (CSA).",
    },
    {
        number: 7,
        section: "Section 2: Martian Analog Sites on Earth",
        analogType: "MARS ANALOG",
        name: "Mauna Kea & Mauna Loa, Hawaii, USA",
        shortName: "Mauna Kea / Mauna Loa, Hawaii",
        region: "Hawaii, United States",
        image: "/analog-sites/Mauna_kea_circle_3dmap.png",
        latitude: 19.8207,
        longitude: -155.4681,
        earthCoordinates: "19.8207° N, 155.4681° W",
        target: "Olympus Mons (18.65° N, 226.20° E) & Tharsis Volcanic Province",
        targetBody: "Mars",
        keyFactors:
            "Similar geology/minerals, volcanic terrains, lava tubes, caves (uncertain on Mars), construction, ISRU, human operations",
        works:
            "High-altitude iron-rich basaltic tephra, weathered volcanic ash (palagonite), shield volcano slopes, and lava tubes closely replicate Martian basaltic regolith and Tharsis volcanism.",
        howItWorks:
            "Supports long-duration crew isolation missions (HI-SEAS habitat), microwave/solar sintering of basalt regolith into landing pads and bricks (ISRU), and water extraction from hydrated minerals.",
        limits:
            "Hawaiian shield volcanoes are far smaller than Martian volcanoes (Olympus Mons is ~22 km high due to lack of plate tectonics and 0.38g gravity); frequent rainfall and trade winds weather the volcanic ash rapidly.",
        sources:
            "NASA HI-SEAS (Hawai'i Space Exploration Analog and Simulation); NASA Kennedy Space Center Swamp Works (ISRU); PISCES (Pacific International Space Center for Exploration Systems).",
    },
    {
        number: 8,
        section: "Section 2: Martian Analog Sites on Earth",
        analogType: "MARS ANALOG",
        name: "Rio Tinto, Andalusia, Spain",
        shortName: "Rio Tinto, Spain",
        region: "Andalusia, Spain",
        image: "/analog-sites/calle_tinto_3dmap.png",
        latitude: 37.7033,
        longitude: -6.5517,
        earthCoordinates: "37.7033° N, 6.5517° W",
        target: "Meridiani Planum / Opportunity Site (1.95° S, 354.47° E)",
        targetBody: "Mars",
        keyFactors: "Similar geology/minerals, robotics, human operations",
        works:
            'Iron- and sulfur-rich mineralogy featuring jarosite, hematite concretions ("blueberries"), and ferric iron oxides mirrors the acidic, sulfate-rich aqueous history of Meridiani Planum on Mars.',
        howItWorks:
            "Calibrates Raman spectrometers, Mössbauer instruments, and biosignature-detection workflows used to search for fossilized microbial biomarkers in Martian iron-sulfate deposits.",
        limits:
            "Active, flowing acidic river water (pH ~2) driven by modern chemolithotrophic bacteria represents a wet, biologically active system, whereas Mars lost surface liquid water billions of years ago.",
        sources:
            "Centro de Astrobiología (CAB-CSIC/INTA), Spain; European Space Agency (ESA); NASA Astrobiology Institute.",
    },
    {
        number: 9,
        section: "Section 2: Martian Analog Sites on Earth",
        analogType: "MARS ANALOG",
        name: "Mojave Desert (Dumont Dunes & Kelso), California, USA",
        shortName: "Mojave Desert, California",
        region: "Dumont Dunes and Kelso, California, United States",
        image: "/analog-sites/gold_stone_3dmap.png",
        similarityRate: null,
        latitude: 35.6833,
        longitude: -116.2167,
        earthCoordinates: "35.6833° N, 116.2167° W",
        target: "Bagnold Dunes, Gale Crater (4.65° S, 137.38° E) & Jezero Landing Zone",
        targetBody: "Mars",
        keyFactors: "Dust storms, aerosols, landing, navigation, mobility, robotics",
        works:
            "Basalt-rich sand dunes, alluvial fans, desert pavements, and windblown dust plumes replicate Martian aeolian bedforms and hazardous rocky landing ellipses.",
        howItWorks:
            "Validates Terrain Relative Navigation (TRN) optical landing cameras on suborbital rockets, rover wheel-slip mitigation algorithms in loose sand, and LIDAR aerosol/dust profiling.",
        limits:
            "Quartz-rich terrestrial sand grains differ in hardness from Martian basaltic-olivine sand; Earth's 1g gravity and dense air change saltation trajectories and aerodynamic parachute/retro-propulsion physics.",
        sources:
            "NASA Jet Propulsion Laboratory (JPL) MarsYard & Mojave Field Tests; NASA Flight Opportunities Program (Terrain Relative Navigation).",
    },
];

/* ------------------------------------------------------------------ */
/* Section 3: Innovative Methods to Bridge Analog Breakdowns           */
/* ------------------------------------------------------------------ */
export const BRIDGING_METHODS = [
    {
        number: 1,
        title: "Single-Factor Site Decomposition",
        text:
            "Because no single Earth location satisfies all planetary criteria simultaneously, mission planners decouple parameters across specialized analogs: Antarctica for permafrost and water-ice drilling, Mojave for EDL (Entry, Descent, and Landing) sensors, and Idaho/Lanzarote for lava tube shelter architecture.",
    },
    {
        number: 2,
        title: "Quantitative Similarity Metrics & Geospatial Scoring",
        text:
            "Planetary scientists construct multi-dimensional Similarity Indices comparing grain-size distribution, slope angles, thermal inertia, and bulk oxide chemistry between Earth field sites and orbital datasets (HiRISE, CRISM, LRO) to mathematically score where an analogy holds or fails.",
    },
    {
        number: 3,
        title: "Machine Learning & Remote Sensing Discovery",
        text:
            "Convolutional Neural Networks (CNNs) and unsupervised clustering algorithms analyze hyperspectral satellite imagery across Earth, the Moon, and Mars to automatically detect hidden lava tube skylights, match mineral assemblages, and discover unmapped terrestrial analogs.",
    },
    {
        number: 4,
        title: "Hybrid Physical-Virtual Gravity & Environment Augmentation",
        text:
            "To overcome Earth's 1g gravity and breathable atmosphere breakdown, engineers pair outdoor analog terrain with active gravity-offloading harnesses (simulating 1/6g Lunar or 3/8g Martian weight), pressurized rover cabins, and Virtual Reality (VR) overlays simulating Martian dust storms and sky scattering.",
    },
];

/* ------------------------------------------------------------------ */
/* Section 4: Master Coordinates, Factors & Goals Reference Matrix     */
/* ------------------------------------------------------------------ */
export const ANALOG_MATRIX = [
    {
        site: "Craters of the Moon, ID",
        siteCoordinates: "43.42° N, 113.52° W",
        target: "Moon: Marius Hills",
        targetCoordinates: "14.09° N, 56.77° W",
        goal1: "Basalt lava flows, intact lava tubes & caves.",
        goal2: "Cave LiDAR mapping, rover mobility, shelter radiation shielding.",
        goal3: "1g gravity limits cave width; air & cave moisture present.",
    },
    {
        site: "Lanzarote, Spain",
        siteCoordinates: "29.05° N, 13.59° W",
        target: "Moon: Mare Tranquillitatis",
        targetCoordinates: "8.50° N, 31.40° E",
        goal1: "Basalt regolith, volcanic terrain, lava tubes.",
        goal2: "Astronaut geology training (PANGAEA), ISRU 3D printing.",
        goal3: "Lacks sharp lunar agglutinates; coastal humidity & 1g gravity.",
    },
    {
        site: "Sudbury Basin, Canada",
        siteCoordinates: "46.60° N, 81.18° W",
        target: "Moon: Tycho Crater",
        targetCoordinates: "43.31° S, 11.36° W",
        goal1: "Impact breccias, shatter cones, melt sheets.",
        goal2: "Artemis astronaut crater mapping & sample selection.",
        goal3: "Glacial & tectonic erosion; dense vegetation cover.",
    },
    {
        site: "Atacama Desert, Chile",
        siteCoordinates: "24.08° S, 69.92° W",
        target: "Mars: Jezero Crater",
        targetCoordinates: "18.38° N, 77.58° E",
        goal1: "Perchlorates, sulfates, hyper-aridity, fine dust/aerosols.",
        goal2: "ExoMars subsurface drilling, rover autonomy, aerosol sensors.",
        goal3: "1,000 mbar air pressure, coastal fog, trace microbes.",
    },
    {
        site: "McMurdo Dry Valleys",
        siteCoordinates: "77.47° S, 162.52° E",
        target: "Mars: Vastitas Borealis",
        targetCoordinates: "68.22° N, 234.25° E",
        goal1: "Continuous permafrost (≤0°C ≥2 yrs), water ice, low temp.",
        goal2: "Cryogenic ice-core drilling (ISRU), crew isolation studies.",
        goal3: "Warmer than Martian winter (-125°C); no CO₂ dry ice frost.",
    },
    {
        site: "Devon Island, Canada",
        siteCoordinates: "75.38° N, 89.68° W",
        target: "Mars: Gale Crater",
        targetCoordinates: "5.40° S, 137.80° E",
        goal1: "Arctic permafrost, impact crater, ground ice, low temp.",
        goal2: "Spacesuit EVAs, rover navigation, Earth-Mars comm delays.",
        goal3: "Summer snowmelt streams; active Arctic tundra biology.",
    },
    {
        site: "Mauna Kea / Loa, HI",
        siteCoordinates: "19.82° N, 155.47° W",
        target: "Mars: Olympus Mons",
        targetCoordinates: "18.65° N, 226.20° E",
        goal1: "Iron-rich basalt, volcanic ash, shield slopes, lava tubes.",
        goal2: "HI-SEAS habitat simulations, regolith sintering (ISRU).",
        goal3: "Plate tectonics & 1g limit volcano height; rainfall weathering.",
    },
    {
        site: "Rio Tinto, Spain",
        siteCoordinates: "37.70° N, 6.55° W",
        target: "Mars: Meridiani Planum",
        targetCoordinates: "1.95° S, 354.47° E",
        goal1: "Hematite, jarosite, iron oxides, sulfate mineralogy.",
        goal2: "Spectrometer calibration & ancient biosignature detection.",
        goal3: "Flowing acidic liquid water & active acidophilic bacteria.",
    },
    {
        site: "Mojave Desert, CA",
        siteCoordinates: "35.68° N, 116.22° W",
        target: "Mars: Bagnold Dunes",
        targetCoordinates: "4.65° S, 137.38° E",
        goal1: "Basaltic sand dunes, rocky fans, windblown dust plumes.",
        goal2: "Landing radar/TRN camera tests, wheel traction, dust LiDAR.",
        goal3: "Quartz sand fraction; 1g & dense air alter descent physics.",
    },
];

/* ------------------------------------------------------------------ */
/* Section 5: Primary Institutional & Scientific Sources               */
/* ------------------------------------------------------------------ */
export const PRIMARY_SOURCES = [
    {
        number: 1,
        institution: "NASA Solar System Exploration Research Virtual Institute (SSERVI) & FINESSE",
        detail:
            "Field Investigations to Enable Solar System Science and Exploration (Craters of the Moon, Idaho & Lunar Lava Tube/Volcanic Analog Studies).",
    },
    {
        number: 2,
        institution: "European Space Agency (ESA) — PANGAEA & CAVES Campaigns",
        detail:
            "Planetary Analogue Geological and Astrobiological Exercise for Astronauts (Lanzarote, Spain & Ries Crater Lunar/Martian Astronaut Training).",
    },
    {
        number: 3,
        institution: "USGS Astrogeology Science Center & Lunar and Planetary Institute (LPI)",
        detail:
            "Terrestrial Analog Sites Database, Coordinate Catalogs, and Sudbury Basin Impact Structure Training Guides.",
    },
    {
        number: 4,
        institution: "NASA Astrobiology & ARADS (Atacama Rover Astrobiology Drilling Studies)",
        detail:
            "Subsurface Drilling, Perchlorate Geochemistry, and ExoMars Rover Field Trials in Yungay, Atacama Desert, Chile.",
    },
    {
        number: 5,
        institution: "National Science Foundation (NSF) McMurdo Dry Valleys LTER & NASA Phoenix Mission Analogs",
        detail:
            "Permafrost Stratigraphy, Sublimation Hydrology, and Cryogenic Water-Ice Extraction in Antarctica.",
    },
    {
        number: 6,
        institution: "NASA Haughton-Mars Project (HMP), Mars Institute & SETI Institute",
        detail:
            "Arctic Permafrost Impact Crater Field Research, Spacesuit Mobility, and Human-Robotic Exploration on Devon Island, Nunavut.",
    },
    {
        number: 7,
        institution: "NASA HI-SEAS & Kennedy Space Center Swamp Works",
        detail:
            "Long-Duration Human Isolation Studies and Basaltic Regolith ISRU/3D-Printing Construction Trials on Mauna Loa, Hawaii.",
    },
    {
        number: 8,
        institution: "Centro de Astrobiología (CAB-CSIC/INTA), Spain",
        detail:
            "Iron-Sulfate Mineralogy, Acidic Aqueous Geochemistry, and Biosignature Instrumentation Testing at Rio Tinto, Andalusia.",
    },
    {
        number: 9,
        institution: "NASA Jet Propulsion Laboratory (JPL) & Flight Opportunities Program",
        detail:
            "MarsYard Mobility Testing, Terrain Relative Navigation (TRN) Landing Sensor Validation, and Aeolian Dust/Aerosol Studies in the Mojave Desert.",
    },
    {
        number: 10,
        institution: "JAXA (Japan Aerospace Exploration Agency) SELENE/Kaguya & NASA LRO (Lunar Reconnaissance Orbiter)",
        detail:
            "Orbital Radar and High-Resolution Imaging of Marius Hills Skylights, Mare Tranquillitatis, and Tycho Crater.",
    },
];

/* ------------------------------------------------------------------ */
/* Moon / Mars analog cards (unchanged)                                */
/* ------------------------------------------------------------------ */
const sites = {
    moon: [
        {
            name: "Haughton Crater",
            region: "Devon Island, Nunavut, Canada",
            topic: "What can impact-crater terrain and remote field operations teach us?",
        },
        {
            name: "Atacama Desert",
            region: "Chile",
            topic: "How can arid ground inform terrain studies and autonomous field tests?",
        },
        {
            name: "Death Valley",
            region: "California, United States",
            topic: "How do geology, dust, and sunlight affect surface operations?",
        },
    ],
    mars: [
        {
            name: "Atacama Desert",
            region: "Chile",
            topic: "How can arid ground inform terrain studies and autonomous field tests?",
        },
        {
            name: "Haughton Crater",
            region: "Devon Island, Nunavut, Canada",
            topic: "What can impact processes and remote field operations teach us?",
        },
        {
            name: "Death Valley",
            region: "California, United States",
            topic: "How do arid geology and environmental stress affect field operations?",
        },
    ],
};

export function earthAnalogsFor(target) {
    return sites[target] || [];
}

export function renderEarthAnalogCards(target) {
    return earthAnalogsFor(target)
        .map(
            ({ name, region, topic }) =>
                `<article class="analog-card"><h3>${name}</h3><span>${region}</span><p>Potential comparison question: ${topic}</p><a href="${ANALOG_SOURCE}" target="_blank" rel="noopener">Challenge source ↗</a></article>`,
        )
        .join("");
}

export function surfaceCoordinates({ x, y, z }) {
    const radius = Math.hypot(x, y, z);
    if (!radius) throw new RangeError("Surface point must be nonzero");
    const latitude = (Math.asin(y / radius) * 180) / Math.PI;
    const longitude = (Math.atan2(-z, x) * 180) / Math.PI;
    return {
        latitude: Object.is(latitude, -0) ? 0 : latitude,
        longitude: Object.is(longitude, -0) ? 0 : longitude,
    };
}

export function lunarHeightPixel(latitude, longitude, width, height) {
    if (width < 1 || height < 1) throw new RangeError("Map dimensions must be positive");
    const x = Math.floor((((longitude + 180) % 360 + 360) % 360) / 360 * width);
    const y = Math.floor(((90 - latitude) / 180) * height);
    return {
        x: Math.min(width - 1, x),
        y: Math.min(height - 1, Math.max(0, y)),
    };
}

export function lunarElevationKm(gray) {
    return -12 + (gray / 255) * 24;
}