import type { LeagueEntry, Standing } from "../../types";

function getLeagueFromPerf(): string|null {
    const entries = performance.getEntriesByType('resource');
    for (const e of entries){
        const m = e.name.match(/\/api\/league\/(\d+)\/details/);
        if (m) return m[1]
        console.log("Checked entry:", e.name);
    }
    console.log("No league ID found in performance entries");
    return null
}

///calls getLeagueFromPerf with retries
export async function getLeagueIdWithRetry(tries = 10, delayMs = 300):Promise<string|null>{
    for (let i=0; i <tries; i++){
      console.log(`Attempt ${i+1} to get league ID`);
        const id = getLeagueFromPerf()
        if (id) return id;
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    return null;
    }

export async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" }); // include cookies explicitly
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();


}

/// issue with getting team names
export function aggStandingNames (
  standings: Standing[],
  league_entries: LeagueEntry[]
){

  const entryNameMap: Record<number, string | null> = {};
  league_entries.forEach(entry => {
    if (entry.id !== null && entry.entry_name !== null) {
      entryNameMap[entry.id] = entry.entry_name;
    }
    else {
      entryNameMap[entry.id] = "Average";
    }
  });

  console.log("Entry Name Map:", entryNameMap);

  console.log(standings, "standings");

  return standings.map(standing => ({
    ...standing, // copies all properties from standing
    
    entry_name: entryNameMap[standing.league_entry] ?? null, 
    // adds entry_name
  }));

}