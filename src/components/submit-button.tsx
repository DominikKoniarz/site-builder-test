import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
    className?: string;
    isPending?: boolean;
    disabled?: boolean;
};

export default function SubmitButton({
    className,
    isPending,
    disabled,
}: Props) {
    return (
        <Button
            type="submit"
            variant="default"
            className={cn("w-fit", className)}
            disabled={isPending || disabled}
        >
            {isPending ? "Submitting..." : "Submit"}
        </Button>
    );
}
