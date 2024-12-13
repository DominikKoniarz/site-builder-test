import CommonInputs from "../common-inputs";
import TemplateBannerConfig from "./template-banner-config";

type Props = {
    index: number;
};

export default function TemplateBannerVariable({ index }: Props) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border p-4 pt-3">
            <div className="flex flex-row gap-4">
                <CommonInputs index={index} />
            </div>
            <div className="flex flex-row gap-4">
                <TemplateBannerConfig index={index} />
            </div>
        </div>
    );
}
