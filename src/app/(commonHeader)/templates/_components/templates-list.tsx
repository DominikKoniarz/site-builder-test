"use client";

import type { TemplateDTO } from "@/dto/templates.dto";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TemplatesListItem from "./templates-list-item";
import useTemplatesList from "../_hooks/use-templates-list";

type Props = {
    initialTemplates: TemplateDTO[];
};

export default function TemplatesList({ initialTemplates }: Props) {
    const { templates, sensors, handleDragEnd } = useTemplatesList({
        initialTemplates,
    });

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={templates.map((template) => template.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul className="flex flex-col gap-4">
                    {templates.map((template) => (
                        <TemplatesListItem
                            key={template.id}
                            template={template}
                        />
                    ))}
                </ul>
            </SortableContext>
        </DndContext>
    );
}
