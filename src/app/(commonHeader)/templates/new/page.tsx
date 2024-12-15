import TemplateAddForm from "./_components/template-add-form";

export default function NewTemplatePage() {
    return (
        <main className="flex h-full w-full flex-row justify-center p-5">
            <div className="max-w-screen-[800px] flex flex-col items-center gap-8">
                <h1 className="text-xl font-bold">Add new template</h1>
                <TemplateAddForm />
            </div>
        </main>
    );
}
