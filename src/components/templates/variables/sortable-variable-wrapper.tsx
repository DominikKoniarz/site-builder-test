import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
    frontendId: string;
    children: React.ReactNode;
};

type SortableVariableWrapperContext = {
    attributes: DraggableAttributes;
    listeners: SyntheticListenerMap | undefined;
};

const sortableVariableWrapperContextInitialValue: SortableVariableWrapperContext =
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

const SortableVariableWrapperContext =
    createContext<SortableVariableWrapperContext>(
        sortableVariableWrapperContextInitialValue,
    );

export const useSortableVariableWrapper = () =>
    useContext(SortableVariableWrapperContext);

export default function SortableVariableWrapper({
    frontendId,
    children,
}: Props) {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: frontendId });

    const style = {
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        transition,
    };

    // to prevent hydration warning
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <SortableVariableWrapperContext
            value={{
                attributes: isMounted
                    ? attributes
                    : sortableVariableWrapperContextInitialValue.attributes,
                listeners,
            }}
        >
            {isMounted ? (
                <div
                    ref={setNodeRef}
                    style={style}
                    className={cn("w-fit", isDragging ? "z-20" : "z-10")}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </SortableVariableWrapperContext>
    );
}
