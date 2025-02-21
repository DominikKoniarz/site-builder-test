import { Button } from "@/components/ui/button";
import { Move } from "lucide-react";
import { useSortableVariableWrapper } from "./sortable-variable-wrapper";

export default function MoveVariableButton() {
    const { listeners, attributes } = useSortableVariableWrapper();

    return (
        <Button
            type="button"
            variant="secondary"
            className="w-9 px-2.5"
            {...attributes}
            {...listeners}
        >
            <Move />
        </Button>
    );
}
