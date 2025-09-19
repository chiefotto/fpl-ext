import { useLeagueData } from "@/hooks/useLeagueData";
import type { Standing} from "../../types";
import  { Card, CardContent } from "../components/ui/card";
import  { Link } from "react-router-dom";








export const StandingsHome = () => {

  const { leagueData, loading, error } = useLeagueData();
  const league_standings = leagueData?.standings;
  const league_entries = leagueData?.league_entries;
  

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!leagueData) return null;
    

  console.log(league_entries, 'entries')
  console.log(league_standings, 'standings')


  const getEntryName = (entryId: number | null): string => {
    const entry = league_entries?.find(e => e.id === entryId);
    return entry ? entry.entry_name || 'Unknown' : 'Unknown';
  }

    
    ///entry id from standings is id in the league_entries

  



    return(
      <div>
        <Card>
          <CardContent>
            <div>
              {league_standings?.map((standing:Standing) => (
                <div key={standing.league_entry}>
        
                  <h3>{standing.rank} Name:{getEntryName(standing.league_entry)} (W/L {standing.matches_won}, {standing.matches_lost})</h3>
            </div>
                ))}
            </div>

          </CardContent>
        </Card>

        <div>
          <Link to={`/`}>BACK</Link>
        </div>
      </div>
    ) ;
  }