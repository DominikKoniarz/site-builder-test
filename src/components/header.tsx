export default async function Header() {
    const date = new Date();
    const lastRenderedAt: string = date.toISOString().slice(11, 23);

    return (
        <header className="w-full bg-slate-700 p-5 text-center font-bold text-white">
            Header of all pages. Rendered at: {lastRenderedAt}
        </header>
    );
}
