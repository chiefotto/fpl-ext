import { useContext } from "react";
import {CurrentGameWeekContext} from "../context/CurrentGameWeekContext";

import type { CurrentGameWeekCtx } from "types";

export function useCurrentGameWeek(): CurrentGameWeekCtx {

  const ctx = useContext(CurrentGameWeekContext);
  if (!ctx) throw new Error("useCurrentGameWeek must be used inside CurrentGameWeekProvider");
  return ctx;
}