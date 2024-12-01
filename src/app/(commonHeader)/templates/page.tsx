import { getTemplates } from "./templates-content";

export const dynamic = "force-dynamic";

export default async function Templates() {
    const templates = await getTemplates();

    return (
        <main className="h-full w-full">
            <h1>Templates</h1>
            <ul>
                {templates.map((template) => (
                    <li key={template.id}>
                        <h2>{template.name}</h2>
                        <p>{template.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
