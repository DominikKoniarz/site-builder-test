type Props = {
    data: unknown;
};

export default function PrettyJson({ data }: Props) {
    return (
        <div className="h-fit">
            <pre className="h-fit">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
