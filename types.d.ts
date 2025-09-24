export interface LeagueDetailsResponse  {
  league: League;
  league_entries: LeagueEntry[];
  matches: Matches[];
  standings: Standing[];
};

export type League = {
    admin_entry: number;
    closed: boolean;
    draft_dt: string;
    draft_pick_time_limit: number;
    draft_status: string;
    draft_tz_show: string;
    id: number;
    ko_rounds: number;
    make_code_public: boolean;
    max_entries: number;
    min_entries: number;
    name: string;
    scoring: string;
    start_event: number;
    stop_event: number;
    trades: string;
    transaction_mode: string;
    variety: string;
    drafts: Array<{
      id: number;
      draft_started: boolean;
      draft_completed: string;
      draft_dt: string;
      event: number;
      league: number;
      order_method: string;
    }>;
    is_renewed: boolean;
  }

export type LeagueEntry = {
    entry_id: number | null;
    entry_name: string | null;
    id: number;///entry_id on standings
    joined_time: string;
    player_first_name: string | null;
    player_last_name: string | null;
    short_name: string;
    waiver_pick: number | null;
  };

export type Matches = Array<{
    event: number;
    finished: boolean;
    league_entry_1: number;
    league_entry_1_points: number;
    league_entry_2: number;
    league_entry_2_points: number;
    started: boolean;
    winning_league_entry: number | null;
    winning_method: string | null;
  }>;

export type Standing = {
    last_rank: number | null;
    league_entry: number;
    matches_drawn: number;
    matches_lost: number;
    matches_played: number;
    matches_won: number;
    points_against: number;
    points_for: number;
    rank: number;
    rank_sort: number;
    total: number;
};

type Ctx = {
  leagueData: LeagueDetailsResponse | null;
  loading: boolean;
  error?: string;
};

type CurrentGameWeekCtx = {
  currentGameWeek: currentGameWeek | null;
  loading: boolean;
  error?: string;
};

export type currentGameWeek = {
  current_event: number;
  current_event_finished: boolean;
  next_event: number;
  processing_status: string;
  trades_time_for_approval: string;
  waivers_processed: string;
}