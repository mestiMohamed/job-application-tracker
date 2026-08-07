import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

interface CreateJobApplicationDialogProps {
    columnId: string,
    boardId: string,
}

export default function CreateJobApplicationDialog({columnId, boardId}: CreateJobApplicationDialogProps) {

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"outline"}>
                    <Plus />
                    Add Job
                </Button>
            </DialogTrigger>
            <DialogContent>

            </DialogContent>
        </Dialog>
    );
}