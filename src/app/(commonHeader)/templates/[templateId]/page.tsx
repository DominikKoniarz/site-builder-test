import TemplateContent from "./template-content";

type Props = {
    params: Promise<{
        templateId: string;
    }>;
};

// always dynamic bc of the params
export default function Templates({ params }: Props) {
    return <TemplateContent params={params} />;
}
