


export function LeagueHomeHeader({ leagueName }: { leagueName: string }) {
  return (
    <div className="homePageHeader">
      <h1> FPL DRAFT</h1>
      <h1 className="text-2xl font-bold">Users team name </h1>
      <h1 className="text-2xl font-bold">{leagueName}</h1>
    </div>
  );
}