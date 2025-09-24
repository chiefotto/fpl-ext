// src/context/LeagueDataContext.ts
import { createContext } from "react";
import type { Ctx } from "../../types";

export const LeagueDataContext = createContext<Ctx | undefined>(undefined);
