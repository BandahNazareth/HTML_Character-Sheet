import { rollperson } from "./rollformular_backend.js";

const STORAGE_KEY = "dod-rollperson-v1";

export function initPersistence() {
  // 1️⃣ LOAD on startup
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const data = JSON.parse(raw);

      // 🔑 Replace rollperson IN PLACE
      Object.keys(rollperson).forEach(k => delete rollperson[k]);
      Object.assign(rollperson, data);
    } catch (e) {
      console.error("Failed to load save:", e);
    }
  }

  // 2️⃣ AUTOSAVE on important events
  const save = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(rollperson)
      );
    } catch (e) {
      console.error("Autosave failed:", e);
    }
  };

  // 🔑 Strategy B: autosave on meaningful moments
  window.addEventListener("character-updated", save);

  // Optional but recommended: safety net
  window.addEventListener("beforeunload", save);
}