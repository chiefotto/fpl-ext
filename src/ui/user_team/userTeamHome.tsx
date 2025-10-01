import { useParams } from "react-router-dom"



export const UserTeamHome = () =>{
    const { user_id, event_id } = useParams<{ user_id: string; event_id: string }>();



    return <div>
        {user_id} {event_id}
    </div>
}