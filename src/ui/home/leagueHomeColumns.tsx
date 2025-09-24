"use client"
import type {ColumnDef} from "@tanstack/react-table";
import { ArrowDownToLine } from 'lucide-react'
import { ArrowUpFromLine } from 'lucide-react';

export type LeagueHomeColumnsType = {
    rank: number;
    last_rank: number | null;
    teamName: string;
    recentForm: {
        wins: number;
        draws: number;
        losses: number;
    };
    pointsScored: number;
    pointsAgainst: number;}



export const leagueHomeColumns: ColumnDef<LeagueHomeColumnsType>[] = [
    {
        accessorKey: 'rank',
        header:'Rank',
        cell:({row}) =>{
            const rank = row.original.rank;
            const lastRank = row.original.last_rank;
            let arrow = null;
            if (lastRank){
                if (rank < lastRank){
                    arrow = <span><ArrowUpFromLine style={{color:'#00ff00'}}/></span>;
                }
                else if (rank > lastRank){
                    arrow = <span><ArrowDownToLine style={{color:'#ff0000'}}/></span>;
            }
            else {
                arrow = null;
            }
        }
            return <div>
                <span>{rank}</span> <span>{arrow}</span>
            </div>
            }
        },

    {
        accessorKey: 'teamName',
        header:'Team Name',
    },
    {
        accessorKey: 'recentForm',
        header:'Recent Form',
        cell:({row}) =>{
            const {wins, draws, losses} = row.original.recentForm;
            
            return <div>
                {Array(wins).fill('🏆').join('')}
                {Array(draws).fill('🤝').join('')}
                {Array(losses).fill('❌').join('')}
            </div>
        }
    },
    {
        accessorKey: 'pointsScored',
        header:'Points Scored',
    },
    {
        accessorKey: 'pointsAgainst',
        header:'Points Against',
    }
]



