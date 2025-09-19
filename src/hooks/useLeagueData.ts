import { useContext } from "react";
import { LeagueDataContext } from "../context/LeagueDataContext";

import type { Ctx } from "types";

export function useLeagueData(): Ctx {

  const ctx = useContext(LeagueDataContext);
  if (!ctx) throw new Error("useLeagueData must be used inside LeagueDataProvider");
  return ctx;
}