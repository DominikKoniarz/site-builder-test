import type { TemplateDTO } from "@/dto/templates.dto";
import {
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

type Props = {
    initialTemplates: TemplateDTO[];
};

const useTemplatesList = ({ initialTemplates }: Props) => {
    const [templates, setTemplates] = useState<TemplateDTO[]>(initialTemplates);

    useEffect(() => {
        setTemplates(initialTemplates);
    }, [initialTemplates]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setTemplates((items) => {
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id,
                );
                const newIndex = items.findIndex(
                    (item) => item.id === over?.id,
                );

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return {
        templates,
        sensors,
        handleDragEnd,
    };
};

export default useTemplatesList;
