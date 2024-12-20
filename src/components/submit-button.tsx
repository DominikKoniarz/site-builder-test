import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
    onClick?: () => void;
    type?: HTMLButtonElement["type"];
    isPending?: boolean;
    text?: {
        default: string;
        loading: string;
    };
}

export default function SubmitButton(props: Props) {
    return (
        <Button
            type={props.type || "submit"}
            variant="default"
            className={cn("w-fit", props.className)}
            disabled={props.isPending || props.disabled}
        >
            {props.isPending
                ? props.text?.loading || "Submitting..."
                : props.text?.default || "Submit"}
        </Button>
    );
}
