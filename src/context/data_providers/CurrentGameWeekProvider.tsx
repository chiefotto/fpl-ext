import React, {useEffect, useState} from "react";
import type { CurrentGameWeekCtx,  currentGameWeek } from "../../../types";
import { fetchJSON } from "@/helpers/leagueDataHelpers";
import { CurrentGameWeekContext } from "../CurrentGameWeekContext";




export function CurrentGameWeekProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<CurrentGameWeekCtx>({ currentGameWeek: null, loading: true });

    useEffect (()=>{
        (async () => {
            try {
                const currentGameWeek = await fetchJSON<currentGameWeek>(`https://draft.premierleague.com/api/game`);
                console.log("Fetched current game week:", currentGameWeek);
                setState({ currentGameWeek: currentGameWeek, loading: false });
            }
            catch (err: unknown) {
                let message = "Unknown error";
                if (err instanceof Error) message = err.message;
                else if (typeof err === "string") message = err;
                setState({ currentGameWeek: null, loading: false, error: message });
            }
        })();
    }, []);
    return <CurrentGameWeekContext.Provider value={state}>{children}</CurrentGameWeekContext.Provider>;
}