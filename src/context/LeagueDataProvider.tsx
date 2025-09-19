
import React, { useEffect, useState} from "react";

import type {Ctx, LeagueDetailsResponse} from '../../types';
import { fetchJSON, getLeagueIdWithRetry } from "@/helpers/leagueDataHelpers";
import { LeagueDataContext } from "./LeagueDataContext";



///checks browser api for league ID


// type Ctx = { leagueData: LeagueDetailsResponse|null; loading: boolean; error?: string };



export function LeagueDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Ctx>({ leagueData: null, loading: true });

  useEffect(() => {
    (async () => {
      try {
        const id = await getLeagueIdWithRetry();
        if (!id) throw new Error("League ID not found");
        const leagueData = await fetchJSON<LeagueDetailsResponse>(
          `https://draft.premierleague.com/api/league/${id}/details`
        );
        setState({ leagueData, loading: false });
      } catch (err: unknown) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        else if (typeof err === "string") message = err;
        setState({ leagueData: null, loading: false, error: message });
      }
    })();
  }, []);

  return <LeagueDataContext.Provider value={state}>{children}</LeagueDataContext.Provider>;
}









// function Content() {
//   const [leagueData, setLeagueData] = useState<LeagueDetailsResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadLeagueData() {

//       try {
//         const UserleagueID = await getLeagueIdWithRetry();
//         if (!UserleagueID) {
//           setError("League ID not found");
//           return;
//         }
//         const data = await fetchJSON<LeagueDetailsResponse>(`https://draft.premierleague.com/api/league/${UserleagueID}/details`);
//         setLeagueData(data);
//       } catch (err) {
//         setError((err as Error).message);
//       }
//     }
//     console.log('re rendering')
//     loadLeagueData();
    
//   }, []);

//   if (error) return <div>Error: {error}</div>;
//   if (!leagueData) return <div>Loading...</div>;

//   return (
//     <div><LeagueHome LeagueHomePropsFull={leagueData}></LeagueHome></div>
   
//   );
// }

// export default Content;