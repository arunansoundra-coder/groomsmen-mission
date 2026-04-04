import { roles } from "./roles.js";
import { codenames } from "./codenames.js";

const getKey = (agent) => `mission_state_${agent}`;

export const state = {
  agent: null,
  role: null,
  codename: null,

  stage: "identity",

  identityComplete: false,
  securityComplete: false,

  missionAccepted: false,

  poker: {
    inProgress: false,
    result: null,
    chips: 0,
    hand: [],
    opponentHand: [],
    bossName: "Arunan",
    bossRole: "Groom"
  },

  failed: {
    identity: false,
    security: false
  }
};

/* LOAD */
export function loadState(agent) {
  const saved = localStorage.getItem(getKey(agent));

  if (saved) {
    Object.assign(state, JSON.parse(saved));
  } else {
    resetState(agent);
  }

  state.agent = agent;
  state.role = roles[agent] || "Groomsman";
  state.codename = codenames[agent] || "Unknown";
}

/* SAVE */
export function saveState() {
  if (!state.agent) return;

  localStorage.setItem(getKey(state.agent), JSON.stringify(state));
}

/* RESET */
export function resetState(agent) {
  Object.assign(state, {
    agent,
    role: roles[agent] || "Groomsman",
    codename: codenames[agent] || "Unknown",

    stage: "identity",

    identityComplete: false,
    securityComplete: false,

    missionAccepted: false,

    poker: {
      inProgress: false,
      result: null,
      chips: 0,
      hand: [],
      opponentHand: [],
      bossName: "Arunan",
      bossRole: "Groom"
    },

    failed: {
      identity: false,
      security: false
    }
  });

  saveState();
}
