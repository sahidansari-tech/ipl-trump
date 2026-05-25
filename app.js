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
  { k: "runs", lbl: "Total Runs", hi: true, fmt: v => v.toLocaleString() },
  { k: "hs", lbl: "High Score", hi: true, fmt: v => v },
  { k: "avg", lbl: "Batting Avg", hi: true, fmt: v => v.toFixed(1) },
  { k: "sr", lbl: "Strike Rate", hi: true, fmt: v => v.toFixed(1) },
  { k: "s6", lbl: "Sixes Hit", hi: true, fmt: v => v },
  { k: "wk", lbl: "Wickets", hi: true, fmt: v => v },
  { k: "ec", lbl: "Economy ↓", hi: false, fmt: v => v === 0 ? "—" : v.toFixed(1) },
  { k: "ct", lbl: "Catches", hi: true, fmt: v => v },
];

const SMAX = { runs: 8500, hs: 180, avg: 55, sr: 180, s6: 360, wk: 210, ec: 11, ct: 145 };

const TC = {
  CSK: ["#FFD700", "#0C3B7C"], MI: ["#0062A3", "#D4AF37"],
  RCB: ["#C8102E", "#1A1A1A"], KKR: ["#3A225D", "#B3A123"],
  SRH: ["#F26522", "#161616"], RR: ["#CC0099", "#1B2E8E"],
  DC: ["#0078BC", "#D01018"], GT: ["#1D2951", "#C8A84B"],
  LSG: ["#2D6DDB", "#FDBC2C"], PBKS: ["#ED1B24", "#ABABAB"],
};

const RE = { BAT: "🏏", BOWL: "🎳", AR: "⚡", WK: "🧤" };

const PD = [
  { i: 0, n: "Virat Kohli", t: "RCB", r: "BAT", runs: 8004, hs: 113, avg: 37.3, sr: 131.1, s6: 254, wk: 4, ec: 8.9, ct: 142 },
  { i: 1, n: "Rohit Sharma", t: "MI", r: "BAT", runs: 6628, hs: 109, avg: 31.2, sr: 130.6, s6: 258, wk: 15, ec: 8.9, ct: 84 },
  { i: 2, n: "David Warner", t: "DC", r: "BAT", runs: 6397, hs: 126, avg: 42.6, sr: 142.4, s6: 212, wk: 0, ec: 0, ct: 68 },
  { i: 3, n: "Shikhar Dhawan", t: "PBKS", r: "BAT", runs: 6769, hs: 106, avg: 35.0, sr: 127.5, s6: 116, wk: 0, ec: 0, ct: 78 },
  { i: 4, n: "Chris Gayle", t: "PBKS", r: "BAT", runs: 4965, hs: 175, avg: 40.7, sr: 148.0, s6: 357, wk: 18, ec: 8.8, ct: 46 },
  { i: 5, n: "AB de Villiers", t: "RCB", r: "BAT", runs: 5162, hs: 133, avg: 39.7, sr: 151.7, s6: 251, wk: 0, ec: 0, ct: 73 },
  { i: 6, n: "Suresh Raina", t: "CSK", r: "BAT", runs: 5528, hs: 100, avg: 32.5, sr: 136.8, s6: 148, wk: 37, ec: 8.5, ct: 109 },
  { i: 7, n: "MS Dhoni", t: "CSK", r: "WK", runs: 5082, hs: 84, avg: 39.1, sr: 135.9, s6: 229, wk: 0, ec: 0, ct: 41 },
  { i: 8, n: "KL Rahul", t: "LSG", r: "WK", runs: 5110, hs: 132, avg: 47.3, sr: 136.4, s6: 148, wk: 0, ec: 0, ct: 54 },
  { i: 9, n: "Faf du Plessis", t: "RCB", r: "BAT", runs: 4367, hs: 119, avg: 36.8, sr: 131.2, s6: 101, wk: 0, ec: 0, ct: 66 },
  { i: 10, n: "Ruturaj Gaikwad", t: "CSK", r: "BAT", runs: 2742, hs: 101, avg: 45.7, sr: 131.5, s6: 78, wk: 0, ec: 0, ct: 31 },
  { i: 11, n: "Shubman Gill", t: "GT", r: "BAT", runs: 3196, hs: 129, avg: 44.4, sr: 142.3, s6: 99, wk: 0, ec: 0, ct: 42 },
  { i: 12, n: "Jos Buttler", t: "RR", r: "WK", runs: 3807, hs: 124, avg: 39.7, sr: 149.2, s6: 196, wk: 0, ec: 0, ct: 40 },
  { i: 13, n: "Ishan Kishan", t: "MI", r: "WK", runs: 2644, hs: 99, avg: 33.2, sr: 135.7, s6: 131, wk: 0, ec: 0, ct: 34 },
  { i: 14, n: "Sanju Samson", t: "RR", r: "WK", runs: 4127, hs: 119, avg: 32.7, sr: 138.4, s6: 165, wk: 0, ec: 0, ct: 38 },
  { i: 15, n: "Hardik Pandya", t: "MI", r: "AR", runs: 3310, hs: 91, avg: 31.0, sr: 145.2, s6: 197, wk: 65, ec: 9.1, ct: 47 },
  { i: 16, n: "Suryakumar Yadav", t: "MI", r: "BAT", runs: 3248, hs: 117, avg: 32.6, sr: 147.2, s6: 173, wk: 0, ec: 0, ct: 39 },
  { i: 17, n: "Rishabh Pant", t: "DC", r: "WK", runs: 3284, hs: 128, avg: 36.5, sr: 148.8, s6: 168, wk: 0, ec: 0, ct: 37 },
  { i: 18, n: "Andre Russell", t: "KKR", r: "AR", runs: 2748, hs: 88, avg: 30.4, sr: 177.3, s6: 237, wk: 96, ec: 9.8, ct: 52 },
  { i: 19, n: "Glenn Maxwell", t: "RCB", r: "AR", runs: 3020, hs: 95, avg: 25.2, sr: 163.4, s6: 179, wk: 29, ec: 8.4, ct: 64 },
  { i: 20, n: "Shreyas Iyer", t: "KKR", r: "BAT", runs: 3403, hs: 96, avg: 32.7, sr: 126.4, s6: 98, wk: 0, ec: 0, ct: 55 },
  { i: 21, n: "Robin Uthappa", t: "CSK", r: "WK", runs: 4952, hs: 88, avg: 27.8, sr: 132.7, s6: 159, wk: 2, ec: 9.2, ct: 68 },
  { i: 22, n: "Dinesh Karthik", t: "RCB", r: "WK", runs: 4843, hs: 97, avg: 25.9, sr: 135.1, s6: 148, wk: 0, ec: 0, ct: 66 },
  { i: 23, n: "Ambati Rayudu", t: "CSK", r: "BAT", runs: 4350, hs: 100, avg: 31.0, sr: 127.9, s6: 87, wk: 28, ec: 8.7, ct: 55 },
  { i: 24, n: "Yuvraj Singh", t: "PBKS", r: "AR", runs: 2750, hs: 83, avg: 26.0, sr: 133.0, s6: 126, wk: 38, ec: 8.3, ct: 58 },
  { i: 25, n: "Nicholas Pooran", t: "LSG", r: "WK", runs: 2186, hs: 82, avg: 26.0, sr: 148.4, s6: 158, wk: 0, ec: 0, ct: 26 },
  { i: 26, n: "Quinton de Kock", t: "LSG", r: "WK", runs: 3303, hs: 140, avg: 33.7, sr: 136.2, s6: 122, wk: 0, ec: 0, ct: 38 },
  { i: 27, n: "Lasith Malinga", t: "MI", r: "BOWL", runs: 147, hs: 23, avg: 7.9, sr: 79.0, s6: 2, wk: 170, ec: 7.4, ct: 17 },
  { i: 28, n: "Dwayne Bravo", t: "CSK", r: "AR", runs: 1262, hs: 68, avg: 17.3, sr: 134.3, s6: 81, wk: 167, ec: 8.4, ct: 43 },
  { i: 29, n: "Ravindra Jadeja", t: "CSK", r: "AR", runs: 2692, hs: 62, avg: 26.7, sr: 130.7, s6: 82, wk: 147, ec: 7.6, ct: 102 },
  { i: 30, n: "Jasprit Bumrah", t: "MI", r: "BOWL", runs: 65, hs: 19, avg: 4.7, sr: 92.0, s6: 2, wk: 150, ec: 7.4, ct: 20 },
  { i: 31, n: "Yuzvendra Chahal", t: "RR", r: "BOWL", runs: 116, hs: 24, avg: 5.3, sr: 108.4, s6: 1, wk: 205, ec: 7.9, ct: 34 },
  { i: 32, n: "Amit Mishra", t: "DC", r: "BOWL", runs: 208, hs: 43, avg: 8.0, sr: 115.2, s6: 5, wk: 166, ec: 7.4, ct: 29 },
  { i: 33, n: "Bhuvneshwar Kumar", t: "SRH", r: "BOWL", runs: 335, hs: 40, avg: 11.0, sr: 116.0, s6: 3, wk: 158, ec: 7.4, ct: 28 },
  { i: 34, n: "Harbhajan Singh", t: "CSK", r: "BOWL", runs: 1009, hs: 64, avg: 12.0, sr: 116.3, s6: 26, wk: 150, ec: 7.1, ct: 47 },
  { i: 35, n: "Piyush Chawla", t: "MI", r: "BOWL", runs: 236, hs: 30, avg: 6.8, sr: 101.5, s6: 4, wk: 157, ec: 8.1, ct: 26 },
  { i: 36, n: "R Ashwin", t: "CSK", r: "AR", runs: 1155, hs: 65, avg: 12.5, sr: 108.3, s6: 27, wk: 157, ec: 7.0, ct: 39 },
  { i: 37, n: "Kagiso Rabada", t: "PBKS", r: "BOWL", runs: 78, hs: 20, avg: 4.9, sr: 111.4, s6: 2, wk: 112, ec: 8.2, ct: 24 },
  { i: 38, n: "Trent Boult", t: "MI", r: "BOWL", runs: 52, hs: 14, avg: 3.5, sr: 92.0, s6: 0, wk: 95, ec: 8.1, ct: 15 },
  { i: 39, n: "Pat Cummins", t: "SRH", r: "AR", runs: 395, hs: 56, avg: 17.0, sr: 134.1, s6: 17, wk: 104, ec: 8.7, ct: 28 },
  { i: 40, n: "Axar Patel", t: "DC", r: "AR", runs: 1232, hs: 64, avg: 20.5, sr: 133.2, s6: 43, wk: 121, ec: 7.4, ct: 56 },
  { i: 41, n: "Washington Sundar", t: "SRH", r: "AR", runs: 847, hs: 66, avg: 21.2, sr: 120.4, s6: 21, wk: 76, ec: 6.8, ct: 31 },
  { i: 42, n: "Deepak Chahar", t: "CSK", r: "BOWL", runs: 375, hs: 69, avg: 17.9, sr: 123.5, s6: 9, wk: 107, ec: 7.7, ct: 22 },
  { i: 43, n: "Mohammed Shami", t: "GT", r: "BOWL", runs: 58, hs: 15, avg: 3.9, sr: 94.2, s6: 0, wk: 109, ec: 8.8, ct: 15 },
  { i: 44, n: "Arshdeep Singh", t: "PBKS", r: "BOWL", runs: 93, hs: 22, avg: 5.5, sr: 107.2, s6: 1, wk: 97, ec: 9.2, ct: 13 },
  { i: 45, n: "Sunil Narine", t: "KKR", r: "AR", runs: 1753, hs: 75, avg: 19.0, sr: 152.4, s6: 82, wk: 177, ec: 6.7, ct: 54 },
  { i: 46, n: "Kieron Pollard", t: "MI", r: "AR", runs: 3412, hs: 83, avg: 28.0, sr: 149.3, s6: 224, wk: 69, ec: 8.5, ct: 60 },
  { i: 47, n: "Gautam Gambhir", t: "KKR", r: "BAT", runs: 4217, hs: 93, avg: 31.2, sr: 124.4, s6: 79, wk: 0, ec: 0, ct: 53 },
];

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

const $ = id => document.getElementById(id);

function show(id) {
  ["sLobby", "sWait", "sGame", "sGameOver"].forEach(s => {
    $(s).style.display = s === id ? "block" : "none";
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

  const bar = $("oppBar");
  bar.innerHTML = "";

  for (let s = 0; s < MAX_PLAYERS; s++) {
    if (s === mySlot) continue;
    const name = (slots[s] && slots[s].name) || `P${s + 1}`;
    const cnt = parsCards(cards[s]).length;
    const chip = document.createElement("div");
    chip.className = "opp-chip" + (s === picker ? " picker" : "") + (elim.includes(s) ? " elim" : "");
    chip.innerHTML = `<div class="opp-cnt">${cnt}</div><div class="opp-nm">${name}</div>`;
    bar.appendChild(chip);
  }

  const area = $("cardArea");
  const myCard = myCards.length > 0 ? PD[myCards[0]] : null;
  area.innerHTML = myCard
    ? mkCard(myCard, null, myCards.length)
    : '<div class="elim-msg">💀 NO CARDS — You are eliminated</div>';

  const aa = $("actionArea");
  const pname = (slots[picker] && slots[picker].name) || `P${picker + 1}`;

  if (elim.includes(mySlot)) {
    aa.innerHTML = '<div class="elim-msg">Watching as spectator...</div>';
  } else if (picker === mySlot) {
    aa.innerHTML = `
      <div class="action-title">⚔️ CHOOSE YOUR WEAPON</div>
      <div class="stat-btns">
        ${STATS.map(s => `<button class="sbtn" onclick="pickStat('${s.k}')">${s.lbl}</button>`).join("")}
      </div>
    `;
  } else {
    aa.innerHTML = `<div class="wait-msg">⏳ <span class="hi">${pname}</span> is choosing a stat...</div>`;
  }
}

async function pickStat(k) {
  if (!fbOk || !roomRef) return;
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
    <tr class="res-row${r.isWin ? " win" : ""}">
      <td>${r.isWin ? "👑" : i + 1}</td>
      <td>${r.isMe ? "▶ " + r.name : r.name}</td>
      <td>${r.pl.n}</td>
      <td>${statDef.fmt(r.val)}</td>
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

function mkCard(pl, activeStat, cnt) {
  const colors = TC[pl.t] || ["#888", "#333"];
  const hGrad = `linear-gradient(135deg,${colors[0]}99 0%,${colors[1]}dd 100%)`;
  const bGrad = `linear-gradient(160deg,${colors[0]}18 0%,${colors[1]}38 100%)`;

  const rows = STATS.map(s => {
    const v = pl[s.k];
    const act = activeStat === s.k;
    const isNA = s.k === "ec" && v === 0;
    const bw = isNA ? 0 : Math.min(100, Math.round((s.k === "ec" ? (SMAX.ec - v) / SMAX.ec : v / SMAX[s.k]) * 100));

    return `
      <div class="srow${act ? " active" : ""}">
        <span class="slbl">${s.lbl}</span>
        <div class="sbar"><div class="sbar-f" style="width:${bw}%"></div></div>
        <span class="sval">${isNA ? "—" : s.fmt(v)}</span>
      </div>
    `;
  }).join("");

  return `
    <div class="ipl-card" style="background:${bGrad}">
      <div class="card-hdr" style="background:${hGrad}">
        <div class="card-name">${RE[pl.r] || ""} ${pl.n}</div>
        <div class="card-meta">
          <span class="card-team">${pl.t}</span>
          <span class="card-role">${pl.r}</span>
        </div>
        ${cnt != null ? `<div class="card-cnt">${cnt} CARDS</div>` : ""}
      </div>
      <div class="card-div"></div>
      <div class="card-stats">${rows}</div>
    </div>
  `;
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
  if (wc.length > 0) $("goCard").innerHTML = mkCard(PD[wc[0]], null, wc.length);
}

window.createRoom = createRoom;
window.joinRoom = joinRoom;
window.hostStart = hostStart;
window.pickStat = pickStat;
window.kickPlayer = kickPlayer;
window.location.reload = window.location.reload.bind(window);