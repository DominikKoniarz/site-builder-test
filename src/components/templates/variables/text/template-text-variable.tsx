import CommonInputs from "../common-inputs";

type Props = {
    index: number;
};

export default function TemplateTextVariable({ index }: Props) {
    return (
        <div className="flex flex-row items-center gap-4 rounded-xl border p-4 pt-3">
            <CommonInputs index={index} />
        </div>
    );
}
