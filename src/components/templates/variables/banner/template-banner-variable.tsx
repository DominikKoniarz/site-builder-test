import CommonInputs from "../common-inputs";
import TemplateBannerConfig from "./template-banner-config";

type Props = {
    index: number;
};

export default function TemplateBannerVariable({ index }: Props) {
    return (
        <div className="flex flex-row items-center gap-4 rounded-xl border p-4 pt-3">
            <CommonInputs index={index} />
            <TemplateBannerConfig index={index} />
        </div>
    );
}
