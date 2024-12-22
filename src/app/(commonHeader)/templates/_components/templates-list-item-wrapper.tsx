"use client";

import { cn } from "@/lib/utils";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
    id: string;
    children: React.ReactNode;
};

type TemplateListItemWrapperContext = {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
};

const templateListItemWrapperContextInitialValue: TemplateListItemWrapperContext =
    {
        attributes: {
            "aria-roledescription": "sortable",
            tabIndex: 0,
            role: "listitem",
            "aria-describedby": "",
            "aria-disabled": false,
            "aria-pressed": false,
        },
        listeners: undefined,
    };

const TemplateListItemWrapperContext =
    createContext<TemplateListItemWrapperContext>(
        templateListItemWrapperContextInitialValue,
    );

export const useTemplateListItemWrapper = () =>
    useContext(TemplateListItemWrapperContext);

export default function TemplatesListItemWrapper({ id, children }: Props) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        transition,
    };

    // to prevent hydration warning
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <TemplateListItemWrapperContext
            value={{
                attributes: isMounted
                    ? attributes
                    : templateListItemWrapperContextInitialValue.attributes,
                listeners,
            }}
        >
            {isMounted ? (
                <li
                    ref={setNodeRef}
                    style={style}
                    className={cn(isDragging ? "z-20" : "z-10")}
                >
                    {children}
                </li>
            ) : (
                children
            )}
        </TemplateListItemWrapperContext>
    );
}
