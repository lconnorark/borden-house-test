// PANEL + OVERLAY
const panel = document.getElementById("info-panel");
const overlay = document.getElementById("overlay");

// SVG containers
const downSVG = document.getElementById("svg-container-downstairs");
const upSVG = document.getElementById("svg-container-upstairs");

// FLOOR BUTTONS
const floorButtons = document.querySelectorAll(".floor-btn");

// ===============================
// FLOOR TOGGLE BEHAVIOR
// ===============================
floorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const floor = btn.dataset.floor;

        // Visual button state
        floorButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Switch floor
        if (floor === "downstairs") {
            downSVG.style.display = "flex";
            upSVG.style.display = "none";
        } else {
            downSVG.style.display = "none";
            upSVG.style.display = "flex";
        }

        // Close info panel when switching floors
        panel.classList.remove("open");
        overlay.classList.remove("active");
    });
});


// ===============================
// HOTSPOT DATA
// ===============================
const hotspotInfo = {

    // DOWNSTAIRS
    downLeft: {
        title: "Downstairs Left Room",
        text: "This downstairs left room served as a multipurpose interior space.",
        image: "",
        timeline: []
    },

    downBreeze: {
        title: "Downstairs Breezeway",
        text: "The breezeway ventilated the home and connected the two rooms.",
        image: "",
        timeline: []
    },

    downRight: {
        title: "Downstairs Right Room",
        text: "The downstairs right room was used as a workspace or living area.",
        image: "",
        timeline: []
    },

    porch: {
        title: "Front Porch",
        text: "A small centered porch typical of this building style.",
        image: "",
        timeline: []
    },

    // UPSTAIRS
    upLeft: {
        title: "Upstairs Left Room",
        text: "This upstairs room mirrors the left room below.",
        image: "",
        timeline: []
    },

    upBreeze: {
        title: "Upstairs Breezeway",
        text: "The upstairs breezeway connected both rooms and provided ventilation.",
        image: "",
        timeline: []
    },

    upRight: {
        title: "Upstairs Right Room",
        text: "This upstairs room served as sleeping or storage space.",
        image: "",
        timeline: []
    }
};


// ===============================
// HOTSPOT CLICK LISTENERS
// ===============================
document.querySelectorAll(".hotspot").forEach(h => {
    h.addEventListener("click", () => {
        const id = h.dataset.hotspot;
        loadHotspotInfo(id);
    });
});


// ===============================
// LOAD HOTSPOT INFO INTO PANEL
// ===============================
function loadHotspotInfo(id) {
    const data = hotspotInfo[id];
    if (!data) return;

    document.getElementById("info-title").textContent = data.title;
    document.getElementById("info-text").textContent = data.text;

    const img = document.getElementById("info-image");
    if (data.image) {
        img.src = data.image;
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }

    renderTimeline(data.timeline);

    panel.classList.add("open");
    overlay.classList.add("active");
}


// ===============================
/* RENDER TIMELINE */
// ===============================
function renderTimeline(entries) {
    const container = document.getElementById("timeline-container");
    container.innerHTML = "";

    if (!entries || entries.length === 0) return;

    const wrap = document.createElement("div");
    wrap.className = "timeline";

    entries.forEach(e => {
        const item = document.createElement("div");
        item.className = "timeline-entry";
        item.innerHTML = `
            <div class="timeline-date">${e.date}</div>
            <div class="timeline-description">${e.description}</div>
        `;
        wrap.appendChild(item);
    });

    container.appendChild(wrap);
}


// ===============================
// CLOSE PANEL ON OVERLAY CLICK
// ===============================
overlay.addEventListener("click", () => {
    panel.classList.remove("open");
    overlay.classList.remove("active");
});
