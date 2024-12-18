import useTemplateForm from "@/hooks/use-template-form";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFieldArray } from "react-hook-form";

type Props = {
    children: React.ReactNode;
};

export default function DndVariablesWrapper({ children }: Props) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const form = useTemplateForm();

    const { replace } = useFieldArray({
        control: form.control,
        name: "variables",
    });

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const currentItems = form.getValues("variables");

            const oldIndex = currentItems.findIndex(
                (item) => item.frontendId === active.id,
            );
            const newIndex = currentItems.findIndex(
                (item) => item.frontendId === over?.id,
            );

            const newItems = arrayMove(currentItems, oldIndex, newIndex).map(
                (item, index) => ({ ...item, order: index }),
            );

            replace(newItems);
        }
    }

    const itemsFrontendIds = form
        .watch("variables")
        .map((item) => item.frontendId);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={itemsFrontendIds}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );
}
