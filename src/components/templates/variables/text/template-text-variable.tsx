import CommonInputs from "../common-inputs";
import DeleteVariableButton from "../delete-variable-button";
import MoveVariableButton from "../move-variable-button";

type Props = {
    index: number;
};

export default function TemplateTextVariable({ index }: Props) {
    return (
        <div className="flex w-fit flex-col gap-4 rounded-xl border bg-slate-800 p-4 pt-3 lg:flex-row">
            <div className="flex flex-col gap-4 lg:flex-row">
                <CommonInputs index={index} />
            </div>
            <div className="ml-auto flex w-fit flex-row items-center gap-4 lg:mt-7">
                <DeleteVariableButton index={index} />
                <MoveVariableButton />
            </div>
        </div>
    );
}
