export const VIP_ID = "1729018123";

const DB = "https://x-men-256cc-default-rtdb.firebaseio.com";
const APPLE_PATH = `${DB}/m11.json`;
const CRASH_PATH = `${DB}/pre/hipr/hipr.json`;

export const APPLE_ROWS = 10;
export const APPLE_COLS = 5;

/** number of rotten apples per row, from bottom (row 0) to top (row 9) */
export const ROTTEN_PER_ROW = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

export type AppleMatrix = boolean[][]; // [row][col] -> true = rotten

/** Read the apple prediction grid from Firebase. Returns [row][col] rotten flags. */
export async function fetchAppleMatrix(): Promise<AppleMatrix | null> {
  try {
    const res = await fetch(APPLE_PATH, { cache: "no-store" });
    if (!res.ok) return null;
    const raw = (await res.json()) as Record<string, Record<string, string>> | null;
    if (!raw) return null;
    const grid: AppleMatrix = [];
    for (let r = 0; r < APPLE_ROWS; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < APPLE_COLS; c++) {
        const key = `m${r * APPLE_COLS + c + 1}`;
        const node = raw[key];
        const value = node ? node[key] : "0";
        row.push(String(value) === "1");
      }
      grid.push(row);
    }
    return grid;
  } catch {
    return null;
  }
}

function pickDistinct(count: number, max: number) {
  const pool = Array.from({ length: max }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j]!, pool[i]!];
  }
  return pool.slice(0, count);
}

export function generateAppleMatrix(): AppleMatrix {
  return ROTTEN_PER_ROW.map((n) => {
    const bad = new Set(pickDistinct(n, APPLE_COLS));
    return Array.from({ length: APPLE_COLS }, (_, c) => bad.has(c));
  });
}

/** Write a freshly generated grid back to Firebase in the m1..m50 format. */
export async function saveAppleMatrix(grid: AppleMatrix): Promise<void> {
  const payload: Record<string, Record<string, string>> = {};
  for (let r = 0; r < APPLE_ROWS; r++) {
    for (let c = 0; c < APPLE_COLS; c++) {
      const key = `m${r * APPLE_COLS + c + 1}`;
      payload[key] = { [key]: grid[r]?.[c] ? "1" : "0" };
    }
  }
  try {
    await fetch(APPLE_PATH, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* offline — keep local grid */
  }
}

/** Read the Aviator crash multiplier prediction. */
export async function fetchCrashPoint(): Promise<number | null> {
  try {
    const res = await fetch(CRASH_PATH, { cache: "no-store" });
    if (!res.ok) return null;
    const raw = await res.json();
    const n = Number(raw);
    return Number.isFinite(n) && n > 1 ? n : null;
  } catch {
    return null;
  }
}
