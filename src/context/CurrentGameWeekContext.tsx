
import { createContext } from "react";
import type { CurrentGameWeekCtx } from "../../types";

export const CurrentGameWeekContext = createContext<CurrentGameWeekCtx | undefined>(undefined);
