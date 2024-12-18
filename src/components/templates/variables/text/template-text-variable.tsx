import CommonInputs from "../common-inputs";
import DeleteVariableButton from "../delete-variable-button";
import MoveVariableButton from "../move-variable-button";

type Props = {
    index: number;
};

export default function TemplateTextVariable({ index }: Props) {
    return (
        <div className="flex flex-row gap-4 rounded-xl border bg-slate-800 p-4 pt-3">
            <div className="flex flex-row gap-4">
                <CommonInputs index={index} />
            </div>
            <DeleteVariableButton index={index} />
            <MoveVariableButton />
        </div>
    );
}
