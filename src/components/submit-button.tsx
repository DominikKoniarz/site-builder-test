import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
    isPending?: boolean;
    text?: {
        default: string;
        loading: string;
    };
}

export default function SubmitButton(props: Props) {
    return (
        <Button
            {...props}
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
