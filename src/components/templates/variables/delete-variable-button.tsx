import { Button } from "@/components/ui/button";
import useTemplateForm from "@/hooks/useTemplateForm";
import { CircleX } from "lucide-react";

type DeleteVariableButtonProps = {
    index: number;
};

type OnlyButtonProps = {
    onClick: () => void;
};

const DeleteVariableButton = ({ index }: DeleteVariableButtonProps) => {
    const form = useTemplateForm();

    const onClick = () => {
        const variables = form.getValues("variables");

        form.setValue(
            "variables",
            variables.filter((_, i) => i !== index),
        );
    };

    return <OnlyButton onClick={onClick} />;
};

const OnlyButton = ({ onClick }: OnlyButtonProps) => {
    return (
        <Button
            type="button"
            variant="destructive"
            className="mt-7 w-9 px-2.5"
            onClick={onClick}
        >
            <CircleX />
        </Button>
    );
};

DeleteVariableButton.OnlyButton = OnlyButton;

export default DeleteVariableButton;
