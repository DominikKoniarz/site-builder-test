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
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { saveTemplatesOrderAction } from "@/actions/templates";
import { actionError } from "@/lib/action-error";

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

                return arrayMove(items, oldIndex, newIndex).map(
                    (template, index) => ({
                        ...template,
                        order: index,
                    }),
                );
            });
        }
    }

    const { execute, isPending: isSavingOrder } = useAction(
        saveTemplatesOrderAction,
        {
            onError: (error) => {
                actionError(error).serverError().validationErrors();
            },
            onSuccess: () => {
                toast.success("Templates order saved");
            },
        },
    );

    const saveOrder = () => {
        execute({ templatesIds: templates.map((template) => template.id) });
    };

    return {
        templates,
        sensors,
        handleDragEnd,
        saveOrder,
        isSavingOrder,
    };
};

export default useTemplatesList;
