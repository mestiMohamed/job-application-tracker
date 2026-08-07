import connectDB from "@/lib/db";
import {Board} from "@/lib/models";
import {getSession} from "@/lib/auth/auth";
import {redirect} from "next/navigation";
import KanbanBoard from "@/components/kanban-board";

export default async function Dashboard() {
    const session = await getSession();

    if(!session?.user){
        redirect("/sign-in");
    }

    await connectDB();

    const board = await Board.findOne({
        userId: session.user.id,
        name: "Job Hunt",
    }).populate({
        path: "columns",
    });

    console.log(board);

    return (<div>
        <KanbanBoard board={JSON.parse(JSON.stringify(board))} userId={session.user.id} />
    </div>)
}