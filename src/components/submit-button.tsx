import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { Loader2Icon } from "lucide-react";

interface Props extends ButtonProps {
    onClick?: () => void;
    type?: HTMLButtonElement["type"];
    isPending?: boolean;
    text?: string;
}

export default function SubmitButton(props: Props) {
    return (
        <Button
            type={props.type || "submit"}
            variant="default"
            className={cn("w-fit", props.className)}
            disabled={props.isPending || props.disabled}
            onClick={props.onClick}
        >
            {props.isPending ? (
                <Loader2Icon className="animate-spin" />
            ) : (
                props.text || "Submit"
            )}
        </Button>
    );
}
