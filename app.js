const FB = {
    apiKey: "__FIREBASE_API_KEY__",
    authDomain: "__FIREBASE_AUTH_DOMAIN__",
    databaseURL: "__FIREBASE_DATABASE_URL__",
    projectId: "__FIREBASE_PROJECT_ID__",
};

const ROOM_PATH = "iplt2";
const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;
const CLIENT_KEY = "iplt2_client_id";
const STATE_KEY = "iplt2_last_room";

const STATS = [
    { k: "mt", lbl: "MATCHES", hi: true, fmt: v => v },
    { k: "runs", lbl: "RUNS", hi: true, fmt: v => v.toLocaleString() },
    { k: "hs", lbl: "HIGH SCORE", hi: true, fmt: v => v },
    { k: "avg", lbl: "AVERAGE", hi: true, fmt: v => v.toFixed(1) },
    { k: "sr", lbl: "STRIKE RATE", hi: true, fmt: v => v.toFixed(1) },
    { k: "s4", lbl: "FOURS", hi: true, fmt: v => v },
    { k: "s6", lbl: "SIXES", hi: true, fmt: v => v },
    { k: "s50", lbl: "FIFTIES", hi: true, fmt: v => v },
    { k: "s100", lbl: "HUNDREDS", hi: true, fmt: v => v },
    { k: "wk", lbl: "WICKETS", hi: true, fmt: v => v },
    { k: "ec", lbl: "ECONOMY", hi: false, fmt: v => v === 0 ? "—" : v.toFixed(1) },
    { k: "ct", lbl: "CATCHES", hi: true, fmt: v => v },
];

const SMAX = {
    mt: 270, runs: 8500, hs: 180, avg: 60, sr: 185,
    s4: 800, s6: 360, s50: 65, s100: 10,
    wk: 210, ec: 11, ct: 145
};

const TC = {
    CSK: ["#FFD700", "#0C3B7C"], MI: ["#0062A3", "#D4AF37"],
    RCB: ["#C8102E", "#1A1A1A"], KKR: ["#3A225D", "#B3A123"],
    SRH: ["#F26522", "#161616"], RR: ["#CC0099", "#1B2E8E"],
    DC: ["#0078BC", "#D01018"], GT: ["#1D2951", "#C8A84B"],
    LSG: ["#2D6DDB", "#FDBC2C"], PBKS: ["#ED1B24", "#ABABAB"],
};

const RE = { BAT: "🏏", BOWL: "🎳", AR: "⚡", WK: "🧤" };

const PD = [
    { i: 0, n: "Virat Kohli", t: "RCB", r: "BAT", mt: 267, runs: 8004, hs: 113, avg: 37.3, sr: 131.1, s4: 739, s6: 254, s50: 58, s100: 8, wk: 4, ec: 8.9, ct: 142 },
    { i: 1, n: "Rohit Sharma", t: "MI", r: "BAT", mt: 243, runs: 6628, hs: 109, avg: 31.2, sr: 130.6, s4: 620, s6: 258, s50: 42, s100: 2, wk: 15, ec: 8.9, ct: 84 },
    { i: 2, n: "David Warner", t: "DC", r: "BAT", mt: 162, runs: 6397, hs: 126, avg: 42.6, sr: 142.4, s4: 583, s6: 212, s50: 52, s100: 4, wk: 0, ec: 0, ct: 68 },
    { i: 3, n: "Shikhar Dhawan", t: "PBKS", r: "BAT", mt: 206, runs: 6769, hs: 106, avg: 35.0, sr: 127.5, s4: 667, s6: 116, s50: 49, s100: 2, wk: 0, ec: 0, ct: 78 },
    { i: 4, n: "Chris Gayle", t: "PBKS", r: "BAT", mt: 142, runs: 4965, hs: 175, avg: 40.7, sr: 148.0, s4: 361, s6: 357, s50: 29, s100: 6, wk: 18, ec: 8.8, ct: 46 },
    { i: 5, n: "AB de Villiers", t: "RCB", r: "BAT", mt: 184, runs: 5162, hs: 133, avg: 39.7, sr: 151.7, s4: 470, s6: 251, s50: 40, s100: 3, wk: 0, ec: 0, ct: 73 },
    { i: 6, n: "Suresh Raina", t: "CSK", r: "BAT", mt: 205, runs: 5528, hs: 100, avg: 32.5, sr: 136.8, s4: 531, s6: 148, s50: 39, s100: 1, wk: 37, ec: 8.5, ct: 109 },
    { i: 7, n: "MS Dhoni", t: "CSK", r: "WK", mt: 250, runs: 5082, hs: 84, avg: 39.1, sr: 135.9, s4: 332, s6: 229, s50: 23, s100: 0, wk: 0, ec: 0, ct: 41 },
    { i: 8, n: "KL Rahul", t: "LSG", r: "WK", mt: 132, runs: 5110, hs: 132, avg: 47.3, sr: 136.4, s4: 471, s6: 148, s50: 41, s100: 4, wk: 0, ec: 0, ct: 54 },
    { i: 9, n: "Faf du Plessis", t: "RCB", r: "BAT", mt: 143, runs: 4367, hs: 119, avg: 36.8, sr: 131.2, s4: 405, s6: 101, s50: 32, s100: 2, wk: 0, ec: 0, ct: 66 },
    { i: 10, n: "Ruturaj Gaikwad", t: "CSK", r: "BAT", mt: 82, runs: 2742, hs: 101, avg: 45.7, sr: 131.5, s4: 265, s6: 78, s50: 22, s100: 1, wk: 0, ec: 0, ct: 31 },
    { i: 11, n: "Shubman Gill", t: "GT", r: "BAT", mt: 98, runs: 3196, hs: 129, avg: 44.4, sr: 142.3, s4: 296, s6: 99, s50: 24, s100: 3, wk: 0, ec: 0, ct: 42 },
    { i: 12, n: "Jos Buttler", t: "RR", r: "WK", mt: 107, runs: 3807, hs: 124, avg: 39.7, sr: 149.2, s4: 332, s6: 196, s50: 29, s100: 5, wk: 0, ec: 0, ct: 40 },
    { i: 13, n: "Ishan Kishan", t: "MI", r: "WK", mt: 105, runs: 2644, hs: 99, avg: 33.2, sr: 135.7, s4: 238, s6: 131, s50: 15, s100: 1, wk: 0, ec: 0, ct: 34 },
    { i: 14, n: "Sanju Samson", t: "RR", r: "WK", mt: 171, runs: 4127, hs: 119, avg: 32.7, sr: 138.4, s4: 371, s6: 165, s50: 22, s100: 3, wk: 0, ec: 0, ct: 38 },
    { i: 15, n: "Hardik Pandya", t: "MI", r: "AR", mt: 121, runs: 3310, hs: 91, avg: 31.0, sr: 145.2, s4: 255, s6: 197, s50: 12, s100: 0, wk: 65, ec: 9.1, ct: 47 },
    { i: 16, n: "Suryakumar Yadav", t: "MI", r: "BAT", mt: 121, runs: 3248, hs: 117, avg: 32.6, sr: 147.2, s4: 285, s6: 173, s50: 21, s100: 1, wk: 0, ec: 0, ct: 39 },
    { i: 17, n: "Rishabh Pant", t: "DC", r: "WK", mt: 98, runs: 3284, hs: 128, avg: 36.5, sr: 148.8, s4: 281, s6: 168, s50: 18, s100: 1, wk: 0, ec: 0, ct: 37 },
    { i: 18, n: "Andre Russell", t: "KKR", r: "AR", mt: 109, runs: 2748, hs: 88, avg: 30.4, sr: 177.3, s4: 185, s6: 237, s50: 10, s100: 0, wk: 96, ec: 9.8, ct: 52 },
    { i: 19, n: "Glenn Maxwell", t: "RCB", r: "AR", mt: 121, runs: 3020, hs: 95, avg: 25.2, sr: 163.4, s4: 255, s6: 179, s50: 11, s100: 0, wk: 29, ec: 8.4, ct: 64 },
    { i: 20, n: "Shreyas Iyer", t: "KKR", r: "BAT", mt: 115, runs: 3403, hs: 96, avg: 32.7, sr: 126.4, s4: 301, s6: 98, s50: 20, s100: 0, wk: 0, ec: 0, ct: 55 },
    { i: 21, n: "Robin Uthappa", t: "CSK", r: "WK", mt: 205, runs: 4952, hs: 88, avg: 27.8, sr: 132.7, s4: 451, s6: 159, s50: 23, s100: 0, wk: 2, ec: 9.2, ct: 68 },
    { i: 22, n: "Dinesh Karthik", t: "RCB", r: "WK", mt: 229, runs: 4843, hs: 97, avg: 25.9, sr: 135.1, s4: 422, s6: 148, s50: 16, s100: 0, wk: 0, ec: 0, ct: 66 },
    { i: 23, n: "Ambati Rayudu", t: "CSK", r: "BAT", mt: 163, runs: 4350, hs: 100, avg: 31.0, sr: 127.9, s4: 388, s6: 87, s50: 20, s100: 1, wk: 28, ec: 8.7, ct: 55 },
    { i: 24, n: "Yuvraj Singh", t: "PBKS", r: "AR", mt: 132, runs: 2750, hs: 83, avg: 26.0, sr: 133.0, s4: 234, s6: 126, s50: 12, s100: 0, wk: 38, ec: 8.3, ct: 58 },
    { i: 25, n: "Nicholas Pooran", t: "LSG", r: "WK", mt: 70, runs: 2186, hs: 82, avg: 26.0, sr: 148.4, s4: 156, s6: 158, s50: 9, s100: 0, wk: 0, ec: 0, ct: 26 },
    { i: 26, n: "Quinton de Kock", t: "LSG", r: "WK", mt: 108, runs: 3303, hs: 140, avg: 33.7, sr: 136.2, s4: 302, s6: 122, s50: 24, s100: 2, wk: 0, ec: 0, ct: 38 },
    { i: 27, n: "Lasith Malinga", t: "MI", r: "BOWL", mt: 122, runs: 147, hs: 23, avg: 7.9, sr: 79.0, s4: 12, s6: 2, s50: 0, s100: 0, wk: 170, ec: 7.4, ct: 17 },
    { i: 28, n: "Dwayne Bravo", t: "CSK", r: "AR", mt: 161, runs: 1262, hs: 68, avg: 17.3, sr: 134.3, s4: 95, s6: 81, s50: 2, s100: 0, wk: 167, ec: 8.4, ct: 43 },
    { i: 29, n: "Ravindra Jadeja", t: "CSK", r: "AR", mt: 236, runs: 2692, hs: 62, avg: 26.7, sr: 130.7, s4: 220, s6: 82, s50: 3, s100: 0, wk: 147, ec: 7.6, ct: 102 },
    { i: 30, n: "Jasprit Bumrah", t: "MI", r: "BOWL", mt: 120, runs: 65, hs: 19, avg: 4.7, sr: 92.0, s4: 5, s6: 2, s50: 0, s100: 0, wk: 150, ec: 7.4, ct: 20 },
    { i: 31, n: "Yuzvendra Chahal", t: "RR", r: "BOWL", mt: 157, runs: 116, hs: 24, avg: 5.3, sr: 108.4, s4: 8, s6: 1, s50: 0, s100: 0, wk: 205, ec: 7.9, ct: 34 },
    { i: 32, n: "Amit Mishra", t: "DC", r: "BOWL", mt: 154, runs: 208, hs: 43, avg: 8.0, sr: 115.2, s4: 16, s6: 5, s50: 0, s100: 0, wk: 166, ec: 7.4, ct: 29 },
    { i: 33, n: "Bhuvneshwar Kumar", t: "SRH", r: "BOWL", mt: 158, runs: 335, hs: 40, avg: 11.0, sr: 116.0, s4: 26, s6: 3, s50: 0, s100: 0, wk: 158, ec: 7.4, ct: 28 },
    { i: 34, n: "Harbhajan Singh", t: "CSK", r: "BOWL", mt: 163, runs: 1009, hs: 64, avg: 12.0, sr: 116.3, s4: 72, s6: 26, s50: 3, s100: 0, wk: 150, ec: 7.1, ct: 47 },
    { i: 35, n: "Piyush Chawla", t: "MI", r: "BOWL", mt: 165, runs: 236, hs: 30, avg: 6.8, sr: 101.5, s4: 17, s6: 4, s50: 0, s100: 0, wk: 157, ec: 8.1, ct: 26 },
    { i: 36, n: "R Ashwin", t: "CSK", r: "AR", mt: 190, runs: 1155, hs: 65, avg: 12.5, sr: 108.3, s4: 84, s6: 27, s50: 3, s100: 0, wk: 157, ec: 7.0, ct: 39 },
    { i: 37, n: "Kagiso Rabada", t: "PBKS", r: "BOWL", mt: 62, runs: 78, hs: 20, avg: 4.9, sr: 111.4, s4: 6, s6: 2, s50: 0, s100: 0, wk: 112, ec: 8.2, ct: 24 },
    { i: 38, n: "Trent Boult", t: "MI", r: "BOWL", mt: 58, runs: 52, hs: 14, avg: 3.5, sr: 92.0, s4: 4, s6: 0, s50: 0, s100: 0, wk: 95, ec: 8.1, ct: 15 },
    { i: 39, n: "Pat Cummins", t: "SRH", r: "AR", mt: 55, runs: 395, hs: 56, avg: 17.0, sr: 134.1, s4: 32, s6: 17, s50: 1, s100: 0, wk: 104, ec: 8.7, ct: 28 },
    { i: 40, n: "Axar Patel", t: "DC", r: "AR", mt: 119, runs: 1232, hs: 64, avg: 20.5, sr: 133.2, s4: 93, s6: 43, s50: 3, s100: 0, wk: 121, ec: 7.4, ct: 56 },
    { i: 41, n: "Washington Sundar", t: "SRH", r: "AR", mt: 73, runs: 847, hs: 66, avg: 21.2, sr: 120.4, s4: 61, s6: 21, s50: 1, s100: 0, wk: 76, ec: 6.8, ct: 31 },
    { i: 42, n: "Deepak Chahar", t: "CSK", r: "BOWL", mt: 86, runs: 375, hs: 69, avg: 17.9, sr: 123.5, s4: 28, s6: 9, s50: 1, s100: 0, wk: 107, ec: 7.7, ct: 22 },
    { i: 43, n: "Mohammed Shami", t: "GT", r: "BOWL", mt: 94, runs: 58, hs: 15, avg: 3.9, sr: 94.2, s4: 4, s6: 0, s50: 0, s100: 0, wk: 109, ec: 8.8, ct: 15 },
    { i: 44, n: "Arshdeep Singh", t: "PBKS", r: "BOWL", mt: 66, runs: 93, hs: 22, avg: 5.5, sr: 107.2, s4: 7, s6: 1, s50: 0, s100: 0, wk: 97, ec: 9.2, ct: 13 },
    { i: 45, n: "Sunil Narine", t: "KKR", r: "AR", mt: 162, runs: 1753, hs: 75, avg: 19.0, sr: 152.4, s4: 131, s6: 82, s50: 5, s100: 0, wk: 177, ec: 6.7, ct: 54 },
    { i: 46, n: "Kieron Pollard", t: "MI", r: "AR", mt: 189, runs: 3412, hs: 83, avg: 28.0, sr: 149.3, s4: 243, s6: 224, s50: 8, s100: 0, wk: 69, ec: 8.5, ct: 60 },
    { i: 47, n: "Gautam Gambhir", t: "KKR", r: "BAT", mt: 154, runs: 4217, hs: 93, avg: 31.2, sr: 124.4, s4: 390, s6: 79, s50: 29, s100: 0, wk: 0, ec: 0, ct: 53 },
];

const $ = id => document.getElementById(id);

let db = null;
let roomRef = null;
let fbOk = false;
let mySlot = -1;
let roomCode = "";
let GS = null;
let showRes = false;
let resTO = null;
let advancing = false;
let presenceRef = null;
let connectedRef = null;
let clientId = localStorage.getItem(CLIENT_KEY) || (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
localStorage.setItem(CLIENT_KEY, clientId);

try {
    if (FB.apiKey && !FB.apiKey.includes("__FIREBASE")) {
        firebase.initializeApp(FB);
        db = firebase.database();
        fbOk = true;
        const fbNote = document.getElementById("fbNote");
        if (fbNote) fbNote.style.display = "none";
    }
} catch (e) {
    console.error(e);
}

// ALL screen IDs in one place
const ALL_SCREENS = ["sSplash", "sMenu", "sMode", "sLobby", "sWait", "sGame", "sGameOver"];

function show(id) {
    ALL_SCREENS.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = s === id ? (
            s === "sSplash" || s === "sMenu" || s === "sMode" ? "flex" : "block"
        ) : "none";
    });
}

function setLS(msg, cls = "c-muted") {
    const e = $("lobbyStatus");
    if (!e) return;
    e.textContent = msg;
    e.className = "status " + cls;
}

function setWS(msg, cls = "c-muted") {
    const e = $("waitStatus");
    if (!e) return;
    e.textContent = msg;
    e.className = "status " + cls;
}

function genCode() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function parsCards(s) {
    return s ? s.split(",").filter(Boolean).map(Number) : [];
}

function joinCards(a) {
    return a.join(",");
}

function cleanupListeners() {
    if (roomRef) roomRef.off();
    if (connectedRef) connectedRef.off();
}

function myName() {
    return $("nameIn").value.trim() || "Player";
}

async function registerPresence(slot) {
    presenceRef = roomRef.child(`slots/${slot}/on`);
    connectedRef = db.ref(".info/connected");
    connectedRef.on("value", snap => {
        if (snap.val() === true && presenceRef) {
            presenceRef.onDisconnect().set(false);
            presenceRef.set(true);
        }
    });
}

async function createRoom() {
    if (!fbOk) return setLS("❌ Firebase not configured!", "c-red");
    cleanupListeners();

    roomCode = genCode();
    mySlot = 0;
    roomRef = db.ref(`${ROOM_PATH}/${roomCode}`);

    await roomRef.set({
        phase: "waiting",
        hostSlot: 0,
        hostId: clientId,
        roundNum: 1,
        slots: {
            0: { name: myName(), slot: 0, on: true, id: clientId }
        }
    });

    localStorage.setItem(STATE_KEY, roomCode);
    await registerPresence(0);
    show("sWait");
    $("codeDisp").textContent = roomCode;
    listenWait();
}

async function joinRoom() {
    if (!fbOk) return setLS("❌ Firebase not configured!", "c-red");
    cleanupListeners();

    const code = $("codeIn").value.trim().toUpperCase();
    if (!code) return setLS("Enter room code!", "c-red");

    roomCode = code;
    roomRef = db.ref(`${ROOM_PATH}/${roomCode}`);

    const snap = await roomRef.once("value");
    if (!snap.exists()) return setLS("❌ Room not found!", "c-red");

    const d = snap.val();
    if (d.phase !== "waiting") return setLS("❌ Game already started!", "c-red");

    const slots = d.slots || {};
    let existing = Object.entries(slots).find(([, p]) => p && p.id === clientId);
    if (existing) {
        mySlot = Number(existing[0]);
    } else {
        const filled = Object.keys(slots).length;
        if (filled >= MAX_PLAYERS) return setLS("❌ Room full!", "c-red");
        mySlot = filled;
        await roomRef.child(`slots/${mySlot}`).set({ name: myName(), slot: mySlot, on: true, id: clientId });
    }

    localStorage.setItem(STATE_KEY, roomCode);
    await registerPresence(mySlot);
    show("sWait");
    $("codeDisp").textContent = roomCode;
    listenWait();
}

function listenWait() {
    roomRef.child("slots").on("value", snap => {
        const slots = snap.val() || {};
        renderSlots(slots);
        const n = Object.values(slots).filter(Boolean).length;

        if (mySlot === 0) {
            $("startBtn").style.display = n >= MIN_PLAYERS ? "block" : "none";
        }

        setWS(
            n >= MAX_PLAYERS ? "All 4 players ready! 🎉" :
                `Waiting... (${n}/${MIN_PLAYERS}+ minimum)`
            , n >= MIN_PLAYERS ? "c-green" : "c-muted");

        maybeFixHost(slots);
    });

    roomRef.child("phase").on("value", snap => {
        if (snap.val() === "playing") initGame();
    });
}

function renderSlots(slots) {
    const el = $("slotList");
    el.innerHTML = "";

    for (let i = 0; i < MAX_PLAYERS; i++) {
        const s = slots[i];
        const d = document.createElement("div");
        const disconnected = s && s.on === false;
        d.className = "slot" + (s ? " filled" : "") + (i === mySlot ? " mine" : "");
        d.innerHTML = `
      <span class="slot-n">${i + 1}</span>
      <span style="flex:1">${s ? s.name : '<span class="c-muted">Waiting...</span>'}</span>
      ${i === mySlot ? '<span class="slot-badge c-gold">YOU</span>' : ""}
      ${i === 0 ? '<span class="slot-badge" style="color:#555">HOST</span>' : ""}
      ${disconnected ? '<span class="slot-badge c-red">OFF</span>' : ""}
    `;
        el.appendChild(d);
    }

    if (mySlot === 0) {
        const kickWrap = document.createElement("div");
        kickWrap.style.marginTop = "10px";
        kickWrap.innerHTML = `
      <div class="sec-title">HOST ACTIONS</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${Object.entries(slots).map(([k, p]) => Number(k) !== 0 && p ? `<button class="sbtn" onclick="kickPlayer(${k})">KICK ${p.name}</button>` : "").join("")}
      </div>
    `;
        el.appendChild(kickWrap);
    }
}

async function kickPlayer(slot) {
    if (mySlot !== 0 || !roomRef) return;
    const snap = await roomRef.child(`slots/${slot}`).once("value");
    if (!snap.exists()) return;
    await roomRef.child(`slots/${slot}`).remove();
}

async function maybeFixHost(slots) {
    if (!roomRef) return;
    const host = slots[0];
    if (host && host.on !== false) return;

    const active = Object.entries(slots)
        .filter(([k, p]) => p && p.on !== false)
        .map(([k]) => Number(k))
        .sort((a, b) => a - b);

    if (active.length === 0) return;

    const newHost = active[0];
    if (newHost === 0) return;

    const updates = {};
    updates[`slots/0`] = slots[newHost];
    updates[`slots/${newHost}`] = null;
    updates.hostSlot = 0;
    updates.hostId = slots[newHost].id || null;

    await roomRef.update(updates);

    if (mySlot === newHost) mySlot = 0;
}

async function hostStart() {
    if (mySlot !== 0) return;
    const snap = await roomRef.child("slots").once("value");
    const slots = snap.val() || {};
    const active = Object.values(slots).filter(Boolean);
    if (active.length < MIN_PLAYERS) return setWS(`Need at least ${MIN_PLAYERS} players!`, "c-red");

    const deck = Array.from({ length: PD.length }, (_, i) => i);
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    const playerCount = active.length;
    const cardsPerPlayer = Math.floor(deck.length / playerCount);
    const hands = {};
    const rc = {};

    for (let s = 0; s < playerCount; s++) {
        const hand = deck.slice(s * cardsPerPlayer, s * cardsPerPlayer + cardsPerPlayer);
        hands[s] = joinCards(hand);
        rc[s] = hand[0];
    }

    await roomRef.update({
        phase: "playing",
        gp: "pick",
        picker: 0,
        stat: null,
        roundNum: 1,
        cards: hands,
        rc: JSON.stringify(rc),
        elim: JSON.stringify([]),
        slots
    });
}

function initGame() {
    cleanupListeners();
    show("sGame");

    // Deal animation — show for 2s then start listening
    const overlay = document.createElement("div");
    overlay.className = "deal-overlay";
    overlay.innerHTML = `
    <div class="deal-inner">
      <div class="deal-cards">
        <div class="deal-card">🃏</div>
        <div class="deal-card">🃏</div>
        <div class="deal-card">🃏</div>
      </div>
      <div class="deal-text">Dealing Cards...</div>
    </div>
  `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add("hiding");
        setTimeout(() => overlay.remove(), 350);
    }, 1800);

    roomRef.on("value", snap => {
        if (!snap.exists()) return;
        GS = snap.val();

        if (GS.phase === "gameover") return doGameOver(GS);
        if (GS.phase !== "playing") return;

        if (GS.gp === "reveal" && !showRes) doReveal(GS);
        else if (GS.gp === "pick") {
            hidRes();
            renderGame();
        }
    });
}

function renderGame() {
    if (!GS) return;

    const cards = GS.cards || {};
    const slots = GS.slots || {};
    const elim = JSON.parse(GS.elim || "[]");
    const picker = GS.picker;
    const myCards = parsCards(cards[mySlot]);

    $("rndBadge").textContent = `ROUND ${GS.roundNum || 1}`;
    $("myCardCnt").textContent = `${myCards.length} CARDS`;

    // opponent chips
    const bar = $("oppBar");
    bar.innerHTML = "";
    for (let s = 0; s < MAX_PLAYERS; s++) {
        if (s === mySlot) continue;
        const name = (slots[s] && slots[s].name) || `P${s + 1}`;
        const cnt = parsCards(cards[s]).length;
        const chip = document.createElement("div");
        chip.className = "opp-chip"
            + (s === picker ? " picker" : "")
            + (elim.includes(s) ? " elim" : "");
        chip.innerHTML = `<div class="opp-cnt">${cnt}</div><div class="opp-nm">${name}</div>`;
        bar.appendChild(chip);
    }

    // card area
    const area = $("cardArea");
    const myCard = myCards.length > 0 ? PD[myCards[0]] : null;
    const amPicker = picker === mySlot && !elim.includes(mySlot) && GS.gp === "pick";

    area.innerHTML = myCard
        ? mkCard(myCard, null, myCards.length, amPicker)
        : '<div class="elim-msg">💀 NO CARDS — You are eliminated</div>';

    // action area — only show who's picking when it's not your turn
    const aa = $("actionArea");
    if (elim.includes(mySlot)) {
        aa.innerHTML = '<div class="elim-msg">Watching as spectator...</div>';
    } else if (!amPicker) {
        const pname = (slots[picker] && slots[picker].name) || `P${picker + 1}`;
        aa.innerHTML = `<div class="wait-msg">⏳ <span class="hi">${pname}</span> is choosing a stat...</div>`;
    } else {
        aa.innerHTML = ""; // hint is already on the card
    }
}

async function pickStat(k) {
    if (!fbOk || !roomRef) return;

    // Animate the card + flash the tapped stat
    const card = document.querySelector('.ipl-card2');
    if (card) {
        card.classList.add('playing');

        const statRow = [...document.querySelectorAll('.cstat')]
            .find(el => el.querySelector('.cstat-lbl')?.textContent ===
                STATS.find(s => s.k === k)?.lbl);
        if (statRow) statRow.classList.add('just-picked');

        await new Promise(r => setTimeout(r, 380));
    }

    await roomRef.update({ gp: "reveal", stat: k });
}

function doReveal(gs) {
    showRes = true;
    const rc = JSON.parse(gs.rc || "{}");
    const statDef = STATS.find(s => s.k === gs.stat);
    const slots = gs.slots || {};
    const elim = JSON.parse(gs.elim || "[]");
    if (!statDef) return;

    const winner = calcWinner(rc, statDef, elim);
    const rows = [];

    for (let s = 0; s < MAX_PLAYERS; s++) {
        const cid = rc[s];
        if (cid === undefined || cid === null) continue;
        const pl = PD[cid];
        const name = (slots[s] && slots[s].name) || `P${s + 1}`;
        rows.push({ s, name, pl, val: pl[gs.stat], isWin: s === winner, isMe: s === mySlot, statDef });
    }

    rows.sort((a, b) =>
        statDef.hi
            ? (b.val || 0) - (a.val || 0)
            : ((a.val === 0 ? 999 : a.val) - (b.val === 0 ? 999 : b.val))
    );

    $("resStat").textContent = statDef.lbl.toUpperCase().replace(" ↓", "");
    $("resRows").innerHTML = rows.map((r, i) => `
  <tr class="res-row${r.isWin ? " win" : ""}"
      style="animation-delay:${i * 0.08}s">
    <td>${r.isWin ? "👑" : i + 1}</td>
    <td>${r.isMe ? "▶ " + r.name : r.name}</td>
    <td>${r.pl.n}</td>
    <td>${r.statDef.fmt(r.val)}</td>
  </tr>
`).join("");

    const wname = winner !== null ? ((slots[winner] && slots[winner].name) || `P${winner + 1}`) : "—";
    const mine = winner === mySlot;
    $("resWinner").textContent = mine ? "🏆 YOU WIN THIS ROUND!" : `${wname} wins this round!`;
    $("resWinner").className = "res-winner " + (mine ? "c-gold" : "c-muted");
    $("resSub").textContent = `+${Object.keys(rc).length} cards collected`;
    $("sResult").style.display = "flex";

    if (resTO) clearTimeout(resTO);
    let cd = 4;
    const tick = () => {
        $("resTimer").textContent = cd > 0 ? `Next round in ${cd}...` : "Advancing...";
        if (cd <= 0) {
            if (mySlot === 0) advRound(gs, winner);
            return;
        }
        cd--;
        resTO = setTimeout(tick, 1000);
    };
    tick();
}

function hidRes() {
    $("sResult").style.display = "none";
    showRes = false;
    if (resTO) {
        clearTimeout(resTO);
        resTO = null;
    }
}

function calcWinner(rc, statDef, elim) {
    let best = null, bestV = null;

    for (let s = 0; s < MAX_PLAYERS; s++) {
        const cid = rc[s];
        if (cid === undefined || cid === null) continue;
        if (elim.includes(s)) continue;

        const v = PD[cid][statDef.k];
        if (!statDef.hi && v === 0) continue;

        if (bestV === null) {
            best = s;
            bestV = v;
            continue;
        }

        if (statDef.hi ? v > bestV : v < bestV) {
            best = s;
            bestV = v;
        }
    }

    if (best === null) {
        for (let s = 0; s < MAX_PLAYERS; s++) {
            if (!elim.includes(s) && rc[s] !== undefined) {
                best = s;
                break;
            }
        }
    }

    return best;
}

async function advRound(gs, winner) {
    if (mySlot !== 0 || advancing) return;
    advancing = true;

    const cards = gs.cards || {};
    const elim = JSON.parse(gs.elim || "[]");
    const rc = JSON.parse(gs.rc || "{}");
    const played = Object.values(rc).map(Number);

    const nc = {};
    for (let s = 0; s < MAX_PLAYERS; s++) {
        const hand = parsCards(cards[s]);
        const rest = hand.slice(1);
        nc[s] = s === winner ? joinCards([...rest, ...played]) : joinCards(rest);
    }

    const ne = [...elim];
    for (let s = 0; s < MAX_PLAYERS; s++) {
        if (parsCards(nc[s]).length === 0 && !ne.includes(s)) ne.push(s);
    }

    const active = [...Array(MAX_PLAYERS).keys()].filter(s => !ne.includes(s));

    if (active.length === 1) {
        await roomRef.update({
            phase: "gameover",
            gp: "gameover",
            cards: nc,
            elim: JSON.stringify(ne),
            gWinner: active[0]
        });
        advancing = false;
        return;
    }

    const nrc = {};
    for (let s = 0; s < MAX_PLAYERS; s++) {
        if (ne.includes(s)) continue;
        const h = parsCards(nc[s]);
        if (h.length > 0) nrc[s] = h[0];
    }

    let np = winner;
    if (ne.includes(np)) np = active[0];

    await roomRef.update({
        gp: "pick",
        picker: np,
        stat: null,
        cards: nc,
        rc: JSON.stringify(nrc),
        roundNum: (gs.roundNum || 1) + 1,
        elim: JSON.stringify(ne)
    });

    advancing = false;
}

function mkCard(pl, activeStat, cnt, isPicker) {
    const colors = TC[pl.t] || ["#666", "#222"];
    const roleEmoji = { BAT: "🏏", BOWL: "🎳", AR: "⚡", WK: "🧤" };

    const LEFT = ["mt", "runs", "hs", "avg", "sr", "s4", "s6", "s50", "s100"];
    const RIGHT = ["wk", "ec", "ct"];

    function row(k) {
        const s = STATS.find(x => x.k === k);
        if (!s) return "";
        const v = pl[k];
        const isNA = k === "ec" && v === 0;
        const act = activeStat === k;
        const pick = isPicker && !isNA;

        return `<div class="cstat${act ? " active" : ""}${pick ? " pickable" : ""}"
      ${pick ? `onclick="pickStat('${k}')"` : ""}>
      <span class="cstat-lbl">${s.lbl}</span>
      <span class="cstat-val${isNA ? " na" : ""}">${isNA ? "—" : s.fmt(v)}</span>
    </div>`;
    }

    return `
  <div class="ipl-card2">
    <div class="c2-hdr"
      style="background:linear-gradient(135deg,${colors[0]}cc 0%,${colors[1]}f0 100%)">
      <div class="c2-hdr-num">${String(pl.i + 1).padStart(2, "0")}</div>
      <div class="c2-hdr-mid">
        <span class="c2-role-badge">${roleEmoji[pl.r] || ""} ${pl.r}</span>
      </div>
      <div class="c2-team-badge">${pl.t}</div>
      ${cnt != null ? `<div class="c2-cnt-badge">${cnt} CARDS</div>` : ""}
      <div class="c2-watermark">${roleEmoji[pl.r] || ""}</div>
    </div>

    <div class="c2-name-plate">
      <div class="c2-name">${pl.n.toUpperCase()}</div>
    </div>

    <div class="c2-stats-grid">
      <div class="c2-col">${LEFT.map(row).join("")}</div>
      <div class="c2-sep"></div>
      <div class="c2-col">${RIGHT.map(row).join("")}</div>
    </div>

    ${isPicker ? '<div class="c2-hint">↑ TAP A STAT TO PLAY</div>' : ""}
  </div>`;
}

function doGameOver(gs) {
    hidRes();
    show("sGameOver");
    const slots = gs.slots || {}, ws = gs.gWinner;
    const wname = ws != null && slots[ws] ? slots[ws].name : "Champion";
    const mine = ws === mySlot;
    $("goTitle").textContent = mine ? "YOU WIN!" : `${wname} WINS!`;
    $("goSub").textContent = mine ? "IPL TRUMP CHAMPION 🏆" : "Better luck next time!";
    const cards = gs.cards || {};
    const wc = parsCards(cards[ws]);
    if (wc.length > 0) {
        $("goCard").innerHTML = mkCard(PD[wc[0]], null, wc.length, false);
        setTimeout(() => {
            const c = $("goCard").querySelector(".ipl-card2");
            if (c) c.classList.add("winner-card");
        }, 400);
    }
}

window.createRoom = createRoom;
window.joinRoom = joinRoom;
window.hostStart = hostStart;
window.pickStat = pickStat;
window.kickPlayer = kickPlayer;
window.location.reload = window.location.reload.bind(window);

document.addEventListener("DOMContentLoaded", () => {

    // ── SPLASH ──────────────────────────────
    show("sSplash");
    let pct = 0;
    const fill = document.getElementById("splashBarFill");
    const splashInterval = setInterval(() => {
        pct += Math.random() * 8 + 4;
        if (pct >= 100) { pct = 100; clearInterval(splashInterval); }
        if (fill) fill.style.width = pct + "%";
        if (pct >= 100) setTimeout(() => show("sMenu"), 300);
    }, 80);

    // ── MENU ────────────────────────────────
    document.getElementById("menuPlayBtn")
        ?.addEventListener("click", () => show("sMode"));

    document.getElementById("menuHowBtn")
        ?.addEventListener("click", () => {
            const el = document.getElementById("sHow");
            if (el) el.style.display = "flex";
        });

    document.getElementById("howCloseBtn")
        ?.addEventListener("click", () => {
            const el = document.getElementById("sHow");
            if (el) el.style.display = "none";
        });

    // ── GAME MODE ────────────────────────────
    document.getElementById("modeBackBtn")
        ?.addEventListener("click", () => show("sMenu"));

    document.getElementById("modeContinueBtn")
        ?.addEventListener("click", () => show("sLobby"));

    document.getElementById("modeCardClassic")
        ?.addEventListener("click", () => {
            document.getElementById("modeCardClassic")
                ?.classList.add("mode-card-active");
        });

    // ── LOBBY ────────────────────────────────
    document.getElementById("createBtn")
        ?.addEventListener("click", createRoom);

    document.getElementById("joinBtn")
        ?.addEventListener("click", joinRoom);

    // ── WAITING ROOM ─────────────────────────
    document.getElementById("startBtn")
        ?.addEventListener("click", hostStart);

    document.getElementById("endRoomBtn")
        ?.addEventListener("click", async () => {
            if (mySlot !== 0 || !roomRef) return;
            await roomRef.remove();
            show("sMenu");
        });

    // ── GAME OVER ────────────────────────────
    document.getElementById("playAgainBtn")
        ?.addEventListener("click", () => {
            cleanupListeners();
            show("sMenu");
        });

});