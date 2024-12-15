import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
    className?: string;
};

export default function SubmitButton({ className }: Props) {
    return (
        <Button
            type="submit"
            variant="default"
            className={cn("w-fit", className)}
        >
            Submit
        </Button>
    );
}
