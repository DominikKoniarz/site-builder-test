import { Button, buttonVariants } from "@/components/ui/button";
import useTemplateForm from "@/hooks/use-template-form";
import { CircleX } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteVariableButtonProps = {
    index: number;
};

type DeleteButtonProps = {
    onClick?: () => void;
};

type DeleteAlertProps = {
    onClick: () => void;
};

const useDeleteVariableButton = (index: number) => {
    const form = useTemplateForm();

    const onClick = () => {
        const variables = form.getValues("variables");

        // Done because we want to keep the order of variables
        const variablesAfterOneToDelete = variables
            .filter((_, i) => i > index)
            .map((variable) => {
                return {
                    ...variable,
                    order: variable.order - 1,
                };
            });

        const variablesBeforeOneToDelete = variables.filter(
            (_, i) => i < index,
        );

        form.setValue("variables", [
            ...variablesBeforeOneToDelete,
            ...variablesAfterOneToDelete,
        ]);
    };

    const currentVariable = form.getValues("variables")[index];

    const isLegacy = "id" in currentVariable && currentVariable.id;

    return { onClick, isLegacy };
};

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
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

const DeleteAlert = ({ onClick }: DeleteAlertProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DeleteButton />
            </AlertDialogTrigger>
            <AlertDialogContent className="border-slate-700 bg-slate-700">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-medium text-white/80">
                        This is legacy variable and it will be removed from
                        database. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onClick}
                        className={buttonVariants({ variant: "destructive" })}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const DeleteVariableButton = ({ index }: DeleteVariableButtonProps) => {
    const { isLegacy, onClick } = useDeleteVariableButton(index);

    return isLegacy ? (
        <DeleteAlert onClick={onClick} />
    ) : (
        <DeleteButton onClick={onClick} />
    );
};

export default DeleteVariableButton;
