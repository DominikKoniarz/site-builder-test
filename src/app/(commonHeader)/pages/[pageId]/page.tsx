type Props = {
    params: Promise<{
        pageId: string;
    }>;
};

// revalidated after template has been edited
// export const generateStaticParams = async (): Promise<
//     { templateId: string }[]
// > => {
//     const templates = await getAllTemplates();
//     return templates.map((template) => ({
//         templateId: template.id,
//     }));
// };

export default async function Templates({ params }: Props) {
    const { pageId } = await params;

    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            {pageId}
        </main>
    );
}
