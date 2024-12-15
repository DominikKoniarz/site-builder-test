import { Button } from "@/components/ui/button";
import useTemplateForm from "@/hooks/use-template-form";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

type Props = {
    className?: string;
};

export default function AddVariableButton({ className }: Props) {
    const form = useTemplateForm();

    const onClick = () => {
        const variables = form.getValues("variables");

        form.setValue("variables", [
            ...variables,
            {
                frontendId: nanoid(),
                name: "",
                tag: "",
                order: variables.length,
                type: "TEXT",
            },
        ]);
    };

    return (
        <Button
            type="button"
            onClick={onClick}
            variant="secondary"
            className={cn("mx-auto w-fit", className)}
        >
            Add variable
        </Button>
    );
}
