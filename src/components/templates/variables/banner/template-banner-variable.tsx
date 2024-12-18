import CommonInputs from "../common-inputs";
import TemplateBannerConfig from "./template-banner-config";
import DeleteVariableButton from "../delete-variable-button";
import MoveVariableButton from "../move-variable-button";

type Props = {
    index: number;
};

export default function TemplateBannerVariable({ index }: Props) {
    return (
        <div className="flex flex-row gap-4 rounded-xl border bg-slate-800 p-4 pt-3">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <CommonInputs index={index} />
                </div>
                <div className="flex flex-row gap-4">
                    <TemplateBannerConfig index={index} />
                </div>
            </div>
            <DeleteVariableButton index={index} />
            <MoveVariableButton />
        </div>
    );
}
