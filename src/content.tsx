
// --- at top with other imports ---
import { createRoot } from "react-dom/client";
import OverlayApp from "./ui/OverlayApp";

// ---------- overlay shell (Shadow DOM + styles) ----------

const host = document.createElement("div");
host.id = "my-fpl-host";

if (!document.getElementById(host.id)) {
  const shadow = host.attachShadow({ mode: "open" });
  document.documentElement.appendChild(host);

  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; }
    .overlay { position: fixed; inset: 0; z-index: 2147483647;
      display: grid; place-items: center; background: rgba(0,0,0,.35);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
    .panel { width: min(1000px, 92vw); height: min(680px, 90vh);
      background:#0f1115; color:#fff; border-radius:16px; box-shadow:0 30px 80px rgba(0,0,0,.45);
      overflow:hidden; display:flex; flex-direction:column; font-family:system-ui, sans-serif; }
    .head { display:flex; align-items:center;;
      padding:12px 16px; border-bottom:1px solid rgba(255,255,255,.08); font-weight:600; }
    .body { flex:1; overflow:auto; padding:16px; }
    .close { appearance:none; border:0; background:transparent; color:#bbb; cursor:pointer;
      font-size:18px; padding:6px 8px; border-radius:8px; }
    .close:hover { background:rgba(255,255,255,.08); color:#fff; }
    .table {width:100%;border-collapse:collapse;}
    .tablebody {flex:1; flex-direction:column; overflow:auto;}
    .homePageHeader {border-radius:5px;  justify-content:space-between; align-items:center;
      display:flex; padding:10px 20px; background:#0f1115; box-shadow:0 2px 4px rgba(0,0,0,.1);}
  `;
  shadow.appendChild(style);
  

  const app = document.createElement("div");
  shadow.appendChild(app);

  const root = createRoot(app);
  root.render(<OverlayApp close={() => { root.unmount(); host.remove(); }} />);
}

  // const lockScroll = () => (document.documentElement.style.overflow = "hidden");
  // const unlockScroll = () => (document.documentElement.style.overflow = "");

  // function Overlay() {
  //   useEffect(() => {
  //     const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
  //     window.addEventListener("keydown", onKey);
  //     lockScroll();
  //     return () => { window.removeEventListener("keydown", onKey); unlockScroll(); };
  //   }, []);

  //   const close = () => {
  //     root.unmount();
  //     host.remove();
  //     unlockScroll();
  //   };

  //   return (
  //     <div className="overlay" onClick={(e) => e.target === e.currentTarget && close()}>
  //       <div className="panel" role="dialog" aria-modal="true" aria-label="my-fpl">
  //         <div className="head">
  //           <span>my-fpl</span>
  //           <button className="close" onClick={close} aria-label="Close">✕</button>
  //         </div>
  //         <div className="body">
  //           <Content /> 
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // const root = createRoot(app);
  // root.render(<MemoryRouter>
  //   <Routes>
  //     <Route path="*" element={<Overlay />} />
  //     <Route path="/standings/:league_id" element={<StandingsHome />} />
  
  //   </Routes>
  //   </MemoryRouter>);


// call it once on load (or behind a hotkey)









