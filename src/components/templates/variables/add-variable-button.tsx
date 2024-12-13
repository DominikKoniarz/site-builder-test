import { Button } from "@/components/ui/button";
import useTemplateForm from "@/hooks/useTemplateForm";
import { cn } from "@/lib/utils";

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
            Dodaj zmienną
        </Button>
    );
}
