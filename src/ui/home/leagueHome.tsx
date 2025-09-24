// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";
// import { useState } from "react";
// import {Button} from "../components/ui/button";
// import { StandingsHome } from "./standingsHome";
import {Link} from 'react-router-dom';
import { useLeagueData } from "@/hooks/useLeagueData";
import { useCurrentGameWeek } from '@/hooks/useCurrentGameWeek';
import { aggStandingNames } from "@/helpers/leagueDataHelpers";
import {LeagueHomeTable} from "./leagueHomeTable";
import { leagueHomeColumns, type LeagueHomeColumnsType } from "./leagueHomeColumns";


// type LeagueHomeProps = {LeagueHomePropsFull:LeagueDetailsResponse|null};


export function LeagueHome( ) {

  const { leagueData, loading, error } = useLeagueData();
  const currentGameWeekData = useCurrentGameWeek();
  const leagueId = leagueData?.league.id;
  const currentGameWeek = currentGameWeekData?.currentGameWeek?.current_event
  const nextGameWeek = currentGameWeekData?.currentGameWeek?.next_event


 

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!leagueData) return null;


  const aggregatedStandingsData =   aggStandingNames(
    leagueData.standings,
    leagueData.league_entries
  );

  ///team name is empty for now 

console.log(leagueData, 'full league data');


  // const matches_played  = leagueData.standings?.[1]?.matches_drawn + leagueData.standings?.[1]?.matches_lost + leagueData.standings?.[1]?.matches_won ;
  const total_matches = leagueData.standings?.[1]?.matches_played ?? 0;
///need to refactor to use match data instead for accuracy
/// use last rank and current rank to display symbol next to team name to represent rank change
///


  const leagueHomeTableData: LeagueHomeColumnsType[] = aggregatedStandingsData.map((standing) => ({
    rank: standing.rank,
    last_rank: standing.last_rank,
    teamName: standing.entry_name || `Average`, // Fallback if entry_name is null
    recentForm: {wins: standing.matches_won, draws: standing.matches_drawn, losses: standing.matches_lost},
    pointsScored: standing.points_for,
    pointsAgainst: standing.points_against,
  }));


  

  
  


  return (
    <div className="p-4 flex flex-col gap-4">

      <h1>Match {currentGameWeek}/{total_matches} next game week: {nextGameWeek}</h1>

      <LeagueHomeTable columns={leagueHomeColumns} data={leagueHomeTableData}></LeagueHomeTable>

  
      
      {/* <Table>
        <TableCaption><h2 className="mb-4 text-2xl font-bold">{leagueData?.league.name}</h2></TableCaption>
        <TableHeader>
        
          <TableRow>
            <TableHead>Recent Form (W/D/L)</TableHead>
            <TableHead>Rank Delta</TableHead>
            <TableHead>Points Scored/Points Against</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
            {aggregatedStandingsData?.map((standing) => (
          <TableRow key={standing.league_entry}>
            <TableCell>({standing.rank}) {standing.entry_name}  {standing.matches_won}/{standing.matches_drawn}/{standing.matches_lost}</TableCell>
            <TableCell>{standing.last_rank} to {standing.rank}</TableCell>
            <TableCell>{standing.points_for}/{standing.points_against}</TableCell>
          </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              Showing 1 leagues. Go to the FPL website to see more.
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table> */}
      <div className='head'>
        <Link to={`standings/${leagueId}`}>STANDINGS</Link>
        <>TEST</>
        {/* <Button variant={'link'} onClick={()=>setShowStandings(prev=> !prev)}/> League Standings */}
      </div>
      {/* <>{showStandings && show_league_standings()}</> */}
    </div>
  );
}


