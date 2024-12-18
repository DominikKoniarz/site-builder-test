import { Button } from "@/components/ui/button";
import { Move } from "lucide-react";
import { useTemplateListItemWrapper } from "./templates-list-item-wrapper";

export default function MoveTemplateButton() {
    const { attributes, listeners } = useTemplateListItemWrapper();

    return (
        <Button
            type="button"
            variant="ghost"
            className="m-0 h-7 w-7 p-0 hover:bg-slate-800 hover:text-white"
            {...attributes}
            {...listeners}
        >
            <Move />
        </Button>
    );
}
