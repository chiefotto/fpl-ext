import { useEffect } from "react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { LeagueHome } from "./home/leagueHome";
import { StandingsHome } from "./standingsHome";
import { LeagueDataProvider } from "../context/data_providers/LeagueDataProvider";
import { CurrentGameWeekProvider } from "@/context/data_providers/CurrentGameWeekProvider";
import { UserTeamHome } from "./user_team/userTeamHome";


function Shell({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const lock = () => (document.documentElement.style.overflow = "hidden");
    const unlock = () => (document.documentElement.style.overflow = "");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    lock();
    return () => { window.removeEventListener("keydown", onKey); unlock(); };
  }, [onClose]);

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="panel" role="dialog" aria-modal="true" aria-label="my-fpl">
        <div className="head">
          <span>my-fpl</span>
          <button className="close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function OverlayApp({ close }: { close: () => void }) {
  return (
    <MemoryRouter>
        <LeagueDataProvider>
          <CurrentGameWeekProvider>
            <Routes>
                <Route element={<Shell onClose={close} />}>
                <Route index element={<LeagueHome/>} />
                <Route path="standings/:league_id" element={<StandingsHome/>} />
                <Route path="user_team/:user_id/:event_id" element={<UserTeamHome />} />
                </Route>
            </Routes>
            </CurrentGameWeekProvider>
      </LeagueDataProvider>
    </MemoryRouter>
  );
}
